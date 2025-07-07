# API Documentation

## Overview

The Howard Special Alerts Feed module provides both PHP (Drupal) and JavaScript APIs for managing and displaying special alerts from thedig.howard.edu.

## JavaScript API

### Main Object

The module exposes a global `specialAlertsFeed` object with the following methods:

### Methods

#### `loadEventData()`

**Purpose**: Fetches alert data from thedig.howard.edu API endpoint

**Parameters**: None

**Returns**: void

**Usage**:
```javascript
specialAlertsFeed.loadEventData();
```

**Details**:
- Constructs API URL with current date filters
- Makes fetch request to thedig.howard.edu
- Handles response and passes data to `checkAlerts()`
- Logs errors to console on failure

#### `checkAlerts(data, site)`

**Purpose**: Processes alert data and filters out dismissed alerts

**Parameters**:
- `data` (Array): Alert data from API
- `site` (String): Base URL of the alerts site

**Returns**: void

**Usage**:
```javascript
specialAlertsFeed.checkAlerts(alertData, 'https://thedig.howard.edu');
```

**Details**:
- Filters alerts based on dismissal cookies
- Adds site URL to alert objects
- Calls `setAlertBars()` if alerts exist or `hideAlerts()` if none

#### `setAlertBars(data)`

**Purpose**: Renders alert HTML to the page

**Parameters**:
- `data` (Array): Filtered alert data

**Returns**: void

**Usage**:
```javascript
specialAlertsFeed.setAlertBars(alertData);
```

**Details**:
- Creates HTML elements for each alert
- Sets appropriate classes and attributes
- Appends alerts to the container
- Adds body class for styling
- Attaches dismissal functionality

#### `hideAlerts()`

**Purpose**: Hides the alert container when no alerts are active

**Parameters**: None

**Returns**: void

**Usage**:
```javascript
specialAlertsFeed.hideAlerts();
```

**Details**:
- Hides the alerts container
- Adds `no-alerts` class to body

#### `setDismiss()`

**Purpose**: Attaches click handlers for alert dismissal

**Parameters**: None

**Returns**: void

**Usage**:
```javascript
specialAlertsFeed.setDismiss();
```

**Details**:
- Adds click listeners to dismiss buttons
- Hides dismissed alerts
- Sets dismissal cookies

#### `setCookie(key, value, days)`

**Purpose**: Stores dismissal preferences in cookies

**Parameters**:
- `key` (String): Cookie name
- `value` (String): Cookie value
- `days` (Number): Expiration in days (optional)

**Returns**: void

**Usage**:
```javascript
specialAlertsFeed.setCookie('alert-123', 'dismissed', 7);
```

**Details**:
- Sets cookie with optional expiration
- Defaults to far future expiration if days not specified

#### `getCookie(key)`

**Purpose**: Retrieves dismissal preferences from cookies

**Parameters**:
- `key` (String): Cookie name to retrieve

**Returns**: String|null

**Usage**:
```javascript
let dismissed = specialAlertsFeed.getCookie('alert-123');
```

**Details**:
- Returns cookie value if exists
- Returns null if cookie doesn't exist

### Properties

#### `alertBar`

**Type**: String

**Purpose**: HTML template for individual alert bars

**Content**: HTML string with placeholders for alert data

## Drupal (PHP) API

### Hooks

#### `howard_special_alerts_feed_help($route_name, RouteMatchInterface $route_match)`

**Purpose**: Provides help text for the module

**Parameters**:
- `$route_name` (String): Current route name
- `$route_match` (RouteMatchInterface): Route match object

**Returns**: String|null

**Usage**: Automatically called by Drupal help system

**Details**:
- Displays README content on help page
- Supports both Markdown and plain text formats

#### `howard_special_alerts_feed_theme()`

**Purpose**: Defines theme templates for the module

**Parameters**: None

**Returns**: Array

**Usage**: Automatically called by Drupal theme system

**Details**:
- Registers the alert template
- Specifies template location and variables

### Block Plugin

#### `SpecialAlertsFeedBlock`

**Namespace**: `Drupal\howard_special_alerts_feed\Plugin\Block`

**Purpose**: Drupal block plugin for displaying alerts

##### Methods

###### `defaultConfiguration()`

**Purpose**: Provides default block configuration

**Returns**: Array

**Usage**: Automatically called by Drupal

###### `blockForm($form, FormStateInterface $form_state)`

**Purpose**: Builds the block configuration form

**Parameters**:
- `$form` (Array): Form array
- `$form_state` (FormStateInterface): Form state object

**Returns**: Array

**Usage**: Automatically called when configuring block

###### `blockSubmit($form, FormStateInterface $form_state)`

**Purpose**: Handles block configuration form submission

**Parameters**:
- `$form` (Array): Form array
- `$form_state` (FormStateInterface): Form state object

**Returns**: void

**Usage**: Automatically called when saving block configuration

###### `build()`

**Purpose**: Builds the block content

**Returns**: Array

**Usage**: Automatically called when rendering block

**Details**:
- Attaches theme template
- Includes CSS/JS libraries
- Passes settings to JavaScript

## API Endpoints

### External API

The module consumes the following external API:

#### Alert Data Endpoint

**URL**: `https://thedig.howard.edu/jsonapi/node/alert`

**Method**: GET

**Parameters**:
- `filter[start-date][condition][path]`: `field_alert_start_date`
- `filter[start-date][condition][value]`: Current ISO date
- `filter[start-date][condition][operator]`: `<=`
- `filter[end-date][condition][path]`: `field_alert_end_date`
- `filter[end-date][condition][value]`: Current ISO date
- `filter[end-date][condition][operator]`: `>=`
- `filter[status][value]`: `1`

**Response**: JSON API compliant response with alert data

**Example Response**:
```json
{
  "data": [
    {
      "id": "123",
      "type": "node--alert",
      "attributes": {
        "title": "Important Alert",
        "field_alert_subtitle": "Additional details",
        "field_alert_level": "high",
        "field_alert_start_date": "2024-01-01T00:00:00+00:00",
        "field_alert_end_date": "2024-12-31T23:59:59+00:00",
        "field_alert_links": {
          "uri": "https://example.com/more-info"
        },
        "path": {
          "alias": "/alerts/important-alert"
        }
      }
    }
  ]
}
```

## Data Structures

### Alert Object

JavaScript alert objects contain:

```javascript
{
  id: "123",                    // Alert ID
  type: "node--alert",          // Content type
  attributes: {
    title: "Alert Title",       // Main alert message
    field_alert_subtitle: "...", // Optional subtitle
    field_alert_level: "high",  // Alert severity (low|high)
    field_alert_start_date: "...", // ISO date string
    field_alert_end_date: "...",   // ISO date string
    field_alert_links: {
      uri: "https://..."        // Optional custom link
    },
    path: {
      alias: "/alerts/..."      // Alert page path
    }
  },
  env: "https://thedig.howard.edu" // Added by module
}
```

### Configuration Objects

Drupal configuration structure:

```php
[
  'special_alerts_feed_settings_site_url' => '',
  'special_alerts_feed_settings_environment' => ''
]
```

## Error Handling

### JavaScript Errors

The module handles errors gracefully:

- Network errors are logged to console
- Failed requests don't break page functionality
- Invalid data is filtered out

### PHP Errors

Drupal errors are handled through:

- Proper exception handling
- Graceful degradation
- Error logging through Drupal's logging system

## Security Considerations

### CORS

The module relies on proper CORS configuration on thedig.howard.edu:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
Access-Control-Allow-Headers: Content-Type
```

### Input Sanitization

All user inputs are sanitized:

- HTML content is properly escaped
- URLs are validated
- Cookie values are sanitized

### XSS Prevention

The module prevents XSS attacks by:

- Using proper HTML escaping
- Validating all external data
- Following Drupal security best practices

## Performance Considerations

### Caching

Current implementation:
- No server-side caching
- Fresh data fetched on each page load
- Client-side cookie storage for dismissals

### Optimization Recommendations

- Implement server-side caching for API responses
- Add client-side caching for improved performance
- Consider using Service Workers for offline functionality

## Browser Compatibility

### Requirements

- Modern JavaScript (ES6+)
- Fetch API support
- Cookie support
- CSS3 support for styling

### Supported Browsers

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Fallbacks

- Graceful degradation for older browsers
- No critical functionality dependencies
- Progressive enhancement approach

## Development Tools

### Debugging

Enable debug mode in browser console:

```javascript
// Enable verbose logging
localStorage.setItem('howard_alerts_debug', 'true');

// View all cookies
console.log(document.cookie);

// Test API endpoint
fetch('https://thedig.howard.edu/jsonapi/node/alert')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Testing

Test the module functionality:

```javascript
// Test alert creation
specialAlertsFeed.setAlertBars([{
  id: 'test-123',
  attributes: {
    title: 'Test Alert',
    field_alert_level: 'high'
  },
  env: 'https://thedig.howard.edu'
}]);

// Test dismissal
specialAlertsFeed.setCookie('howard-newsroom-alerts--test-123', 'dismissed', 1);

// Test cookie retrieval
console.log(specialAlertsFeed.getCookie('howard-newsroom-alerts--test-123'));
```

## Extension Points

### Customization

Extend the module by:

1. **Override CSS**: Add custom styles in your theme
2. **Extend JavaScript**: Add custom functionality to the global object
3. **Override Templates**: Copy and modify Twig templates
4. **Custom Block**: Create derivative blocks with additional functionality

### Hooks

Available hooks for customization:

- `hook_howard_special_alerts_feed_alter()`: Modify alert data
- `hook_howard_special_alerts_feed_theme_alter()`: Alter theme definitions
- `hook_howard_special_alerts_feed_block_alter()`: Modify block output

*Note: These hooks are not currently implemented but could be added in future versions*
