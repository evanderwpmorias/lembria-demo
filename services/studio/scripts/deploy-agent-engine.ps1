param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectId,

    [string]$Region = "us-central1",

    [string]$DisplayName = "studio-google-search-agent",

    [string]$StagingBucket,

    [string]$AgentPath = "app/google_search_agent",

    [string]$RequirementsFile,
    
    [string]$Model = "gemini-2.5-flash"
)

$ErrorActionPreference = "Stop"

function Require-Command {
    param([string]$Name)

    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Required command '$Name' was not found in PATH."
    }
}

Require-Command "gcloud"
Require-Command "uv"

$uvCommand = (Get-Command uv).Source

if (-not $StagingBucket) {
    $suffix = Get-Random -Minimum 100000 -Maximum 999999
    $StagingBucket = "gs://$ProjectId-agent-engine-$suffix"
}

$agentFullPath = (Resolve-Path $AgentPath).Path
$deployScriptPath = (Resolve-Path "scripts/deploy_agent_engine.py").Path

Write-Host "Using project: $ProjectId"
Write-Host "Using region: $Region"
Write-Host "Using staging bucket: $StagingBucket"
Write-Host "Deploying agent source from: $AgentPath"

gcloud config set project $ProjectId --quiet | Out-Null
gcloud services enable aiplatform.googleapis.com storage.googleapis.com --quiet

try {
    gcloud auth application-default print-access-token | Out-Null
}
catch {
    throw "Application Default Credentials are not configured. Run 'gcloud auth application-default login' and retry."
}

$bucketExists = $true
try {
    gcloud storage buckets describe $StagingBucket | Out-Null
}
catch {
    $bucketExists = $false
}

if (-not $bucketExists) {
    gcloud storage buckets create $StagingBucket --project=$ProjectId --location=$Region
}

$env:GOOGLE_GENAI_USE_VERTEXAI = "TRUE"
$env:GOOGLE_CLOUD_PROJECT = $ProjectId
$env:GOOGLE_CLOUD_LOCATION = $Region
$env:DEMO_AGENT_MODEL = $Model

Push-Location (Split-Path $agentFullPath -Parent | Split-Path -Parent)
try {
    $deployArgs = @(
        "run",
        "python",
        $deployScriptPath,
        "--project-id",
        $ProjectId,
        "--region",
        $Region,
        "--display-name",
        $DisplayName,
        "--staging-bucket",
        $StagingBucket,
        "--agent-path",
        $AgentPath,
        "--model",
        $Model
    )

    if ($RequirementsFile) {
        $requirementsFullPath = (Resolve-Path $RequirementsFile).Path
        $deployArgs += @("--requirements-file", $requirementsFullPath)
    }

    $stdoutPath = [System.IO.Path]::GetTempFileName()
    $stderrPath = [System.IO.Path]::GetTempFileName()
    try {
        $process = Start-Process `
            -FilePath $uvCommand `
            -ArgumentList $deployArgs `
            -NoNewWindow `
            -Wait `
            -PassThru `
            -RedirectStandardOutput $stdoutPath `
            -RedirectStandardError $stderrPath

        $deployOutput = @()
        if (Test-Path $stdoutPath) {
            $deployOutput += Get-Content $stdoutPath
        }
        if (Test-Path $stderrPath) {
            $deployOutput += Get-Content $stderrPath
        }

        $deployExitCode = $process.ExitCode
    }
    finally {
        Remove-Item $stdoutPath, $stderrPath -ErrorAction SilentlyContinue
    }

    $deployOutput | ForEach-Object { Write-Host $_ }

    if ($deployExitCode -ne 0) {
        throw "Agent Engine deployment failed. Review the log output above for details."
    }
}
finally {
    Pop-Location
}

Write-Host "Deployment submitted. List deployed engines with:"
Write-Host "gcloud ai reasoning-engines list --project=$ProjectId --region=$Region"