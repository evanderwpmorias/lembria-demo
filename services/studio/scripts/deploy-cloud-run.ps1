param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectId,

    [Parameter(Mandatory = $true)]
    [string]$Region,

    [Parameter(Mandatory = $true)]
    [string]$ServiceName,

    [string]$Repository = "cloud-run-images",
    [string]$ImageName = "studio",
    [string]$Platform = "managed",
    [switch]$AllowUnauthenticated,
    [string[]]$SetEnvVar,
    [string]$Cpu = "1",
    [string]$Memory = "1Gi",
    [string]$MinInstances = "0",
    [string]$MaxInstances = "2"
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $scriptDir "..")
$imageUri = "{0}-docker.pkg.dev/{1}/{2}/{3}" -f $Region, $ProjectId, $Repository, $ImageName

Push-Location $projectRoot

try {
    gcloud config set project $ProjectId | Out-Null

    $repoCheck = gcloud artifacts repositories describe $Repository --location $Region 2>$null
    if (-not $repoCheck) {
        Write-Host "Creating Artifact Registry repository '$Repository' in $Region"
        gcloud artifacts repositories create $Repository `
            --repository-format=docker `
            --location=$Region `
            --description="Container images for Cloud Run deployments"
    }

    Write-Host "Building container image $imageUri"
    gcloud builds submit --tag $imageUri .

    $deployArgs = @(
        "run", "deploy", $ServiceName,
        "--image", $imageUri,
        "--region", $Region,
        "--project", $ProjectId,
        "--platform", $Platform,
        "--cpu", $Cpu,
        "--memory", $Memory,
        "--min-instances", $MinInstances,
        "--max-instances", $MaxInstances
    )

    if ($AllowUnauthenticated) {
        $deployArgs += "--allow-unauthenticated"
    }

    if ($SetEnvVar -and $SetEnvVar.Count -gt 0) {
        $deployArgs += @("--set-env-vars", ($SetEnvVar -join ","))
    }

    Write-Host "Deploying Cloud Run service $ServiceName"
    gcloud @deployArgs
}
finally {
    Pop-Location
}