import type { H3Event } from "h3";
import { getUserByToken, getRole } from "./auth-handlers";
import { createError, setResponseStatus } from 'h3';

// Define endpoint to role mapping (auto-generated from API settings)
const ENDPOINT_ROLE_MAP = {
  "//families": {
    "paths": [
      "//families",
      "//families/{id}"
    ],
    "permissions": {
      "GET": [
        "admin",
        "user",
        "public"
      ],
      "POST": [
        "admin"
      ],
      "PUT": [
        "admin"
      ],
      "DELETE": [
        "admin"
      ],
      "PATCH": [
        "admin"
      ]
    }
  },
  "//persons": {
    "paths": [
      "//persons",
      "//persons/{id}"
    ],
    "permissions": {
      "GET": [
        "admin",
        "user",
        "public"
      ],
      "POST": [
        "admin"
      ],
      "PUT": [
        "admin"
      ],
      "DELETE": [
        "admin"
      ],
      "PATCH": [
        "admin"
      ]
    }
  },
  "//stories": {
    "paths": [
      "//stories",
      "//stories/{id}"
    ],
    "permissions": {
      "GET": [
        "admin",
        "user",
        "public"
      ],
      "POST": [
        "admin"
      ],
      "PUT": [
        "admin"
      ],
      "DELETE": [
        "admin"
      ],
      "PATCH": [
        "admin"
      ]
    }
  },
  "//users": {
    "paths": [
      "//users",
      "//users/{id}"
    ],
    "permissions": {
      "GET": [
        "admin",
        "user",
        "public"
      ],
      "POST": [
        "admin"
      ],
      "PUT": [
        "admin"
      ],
      "DELETE": [
        "admin"
      ],
      "PATCH": [
        "admin"
      ]
    }
  },
  "//memories": {
    "paths": [
      "//memories",
      "//memories/{id}"
    ],
    "permissions": {
      "GET": [
        "admin",
        "user",
        "public"
      ],
      "POST": [
        "admin"
      ],
      "PUT": [
        "admin"
      ],
      "DELETE": [
        "admin"
      ],
      "PATCH": [
        "admin"
      ]
    }
  },
  "//sessions": {
    "paths": [
      "//sessions",
      "//sessions/{id}"
    ],
    "permissions": {
      "GET": [
        "admin",
        "user",
        "public"
      ],
      "POST": [
        "admin"
      ],
      "PUT": [
        "admin"
      ],
      "DELETE": [
        "admin"
      ],
      "PATCH": [
        "admin"
      ]
    }
  },
  "//messages": {
    "paths": [
      "//messages",
      "//messages/{id}"
    ],
    "permissions": {
      "GET": [
        "admin",
        "user",
        "public"
      ],
      "POST": [
        "admin"
      ],
      "PUT": [
        "admin"
      ],
      "DELETE": [
        "admin"
      ],
      "PATCH": [
        "admin"
      ]
    }
  }
};

/**
 * Checks if a user role is allowed for a specific endpoint and method
 * @param endpoint The endpoint path
 * @param method The HTTP method
 * @param role The user's role
 * @returns boolean indicating if the user is authorized
 */
const isRoleAllowed = (endpoint: string, method: string, role: string): boolean => {
  if (!ENDPOINT_ROLE_MAP[endpoint]) return false;
  
  // Handle new format with 'permissions' property
  if (ENDPOINT_ROLE_MAP[endpoint].permissions) {
    if (!ENDPOINT_ROLE_MAP[endpoint].permissions[method]) return false;
    
    const allowedRoles = ENDPOINT_ROLE_MAP[endpoint].permissions[method];
    // If allowedRoles includes "public", everyone has access
    if (allowedRoles.includes("public")) return true;
    // Check if the user's role is in the allowed roles
    return allowedRoles.includes(role);
  }
  
  // Handle legacy format with direct method mapping
  if (!ENDPOINT_ROLE_MAP[endpoint][method]) return false;
  
  const allowedRoles = ENDPOINT_ROLE_MAP[endpoint][method];
  // If allowedRoles includes "public", everyone has access
  if (allowedRoles.includes("public")) return true;
  // Check if the user's role is in the allowed roles
  return allowedRoles.includes(role);
};

/**
 * Middleware to check if a user is authorized to access an endpoint
 * @param event The H3Event from the request
 * @param endpoint The endpoint path (can be determined from event)
 * @returns boolean - true if user is authorized, throws error otherwise
 */
export const authorizeRequest = async (event: H3Event): Promise<boolean> => {
  // Get the endpoint path and method
  const url = event.node.req.url || "/";
  const method = event.node.req.method || "GET";
  
  // Extract endpoint path from URL (remove query params)
  const endpoint = url.split("?")[0];
  
  // Find the matching endpoint in our map (handling path parameters)
  const matchingEndpoint = findMatchingEndpoint(endpoint);
  
  if (!matchingEndpoint) {
    // If endpoint not found in our map, default to denying access
    throw createError({
      statusCode: 404,
      message: "Endpoint not found"
    });
  }
  
  // Check if this endpoint+method combination has "public" access
  if (isRoleAllowed(matchingEndpoint, method, "public")) {
    return true;
  }
  
  // Get user from request
  const user = await getUserByToken(event);
  if (!user || !user.uid) {
    throw createError({
      statusCode: 401,
      message: "Authentication required"
    });
  }
  
  // Get user role
  const role = user.role || await getRole(user.uid);
  if (!role) {
    throw createError({
      statusCode: 403,
      message: "No role assigned to user"
    });
  }
  
  // Check if user's role is allowed for this endpoint+method
  if (!isRoleAllowed(matchingEndpoint, method, role)) {
    throw createError({
      statusCode: 403,
      message: "Insufficient permissions to access this resource"
    });
  }
  
  // User is authorized
  return true;
};

/**
 * Finds the matching endpoint pattern in the ENDPOINT_ROLE_MAP
 * Handles path parameters like /{id} by replacing with regex pattern
 * @param requestPath The actual request path
 * @returns The matching endpoint pattern from the map, or null if not found
 */
const findMatchingEndpoint = (requestPath: string): string | null => {
  // First try exact match
  if (ENDPOINT_ROLE_MAP[requestPath]) {
    return requestPath;
  }
  
  // Check if this path is included in any endpoint's paths array
  for (const endpoint of Object.keys(ENDPOINT_ROLE_MAP)) {
    const endpointConfig = ENDPOINT_ROLE_MAP[endpoint];
    
    // If using the new format with paths array
    if (endpointConfig.paths && Array.isArray(endpointConfig.paths)) {
      // Check if the requestPath is directly in the paths array
      if (endpointConfig.paths.includes(requestPath)) {
        return endpoint;
      }
      
      // Check each path in the array for parameter matching
      for (const pathPattern of endpointConfig.paths) {
        if (pathMatchesPattern(requestPath, pathPattern)) {
          return endpoint;
        }
      }
    }
  }
  
  // Try pattern matching for paths with parameters (legacy format)
  const pathSegments = requestPath.split('/').filter(Boolean);
  
  for (const endpoint of Object.keys(ENDPOINT_ROLE_MAP)) {
    // Skip endpoints with paths array as we already checked those
    if (ENDPOINT_ROLE_MAP[endpoint].paths) continue;
    
    if (pathMatchesPattern(requestPath, endpoint)) {
      return endpoint;
    }
  }
  return null;
};

/**
 * Helper function to check if a path matches a pattern
 */
function pathMatchesPattern(path: string, pattern: string): boolean {
  const pathSegments = path.split('/').filter(Boolean);
  const patternSegments = pattern.split('/').filter(Boolean);
  
  // Skip if segment count doesn't match
  if (pathSegments.length !== patternSegments.length) {
    return false;
  }
  
  // Check each segment
  for (let i = 0; i < patternSegments.length; i++) {
    // If segment is a path parameter like {id}, it matches anything
    if (patternSegments[i].startsWith('{') && patternSegments[i].endsWith('}')) {
      continue;
    }
    
    // Otherwise, segment must match exactly
    if (patternSegments[i] !== pathSegments[i]) {
      return false;
    }
  }
  
  return true;
}

