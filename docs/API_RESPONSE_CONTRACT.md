# API Response Contract

## Overview
All API responses follow a single, predictable structure. This is the contract of truth for the frontend.
Base path: `/api/<API_VERSION>/...` (default `v1`).

## Standard Shape
```json
{
  "success": true,
  "result": 200,
  "message": "OK",
  "error": null,
  "data": {},
  "details": null,
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "hasNext": true,
    "hasPrev": false,
    "totalPages": 5
  },
  "debug": {
    "timestamp": "2026-02-08T04:23:03.280Z",
    "path": "/api/v1/auth/login"
  }
}
```

## Fields
- `success`: boolean. Indicates if the operation succeeded.
- `result`: number. HTTP status code.
- `message`: string. Human-readable message.
- `error`: string | null. Error code/description (null on success).
- `data`: any | null. Payload.
- `details` (optional): extra error details (validation, etc).
- `meta` (optional): pagination metadata.
- `debug` (optional): included only in non-production environments.

## Pagination
When returning lists, the API should include `meta`:
- `page`, `limit`, `total`
- `hasNext`, `hasPrev`
- `totalPages` (optional)

## Notes
- Binary/file responses are excluded from this wrapper.
- If the controller returns the standard shape, it is passed through unchanged.

## Controller Examples
```ts
// Example: standard success response
return ApiResponseFactory.success(user, 'User fetched');

// Example: created response
return ApiResponseFactory.created(newUser, 'User created');

// Example: paginated response
return ApiResponseFactory.success(items, 'List', {
  page,
  limit,
  total,
  hasNext,
  hasPrev,
});
```
