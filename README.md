# Howard Special Alerts Feed

[![License](https://img.shields.io/badge/license-GPL--2.0%2B-blue.svg)](LICENSE)
[![Drupal](https://img.shields.io/badge/drupal-10%20%7C%2011-blue.svg)](https://www.drupal.org)

A Drupal module that provides a dynamic special alerts feed block for Howard University websites. This module fetches real-time alerts from thedig.howard.edu and displays them as dismissible notification bars across your site.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Styling](#styling)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Alerts**: Automatically fetches current alerts from thedig.howard.edu
- **Date-based Filtering**: Only displays alerts that are currently active based on start/end dates
- **Dismissible Alerts**: Users can dismiss alerts, with preferences stored in cookies
- **Responsive Design**: Mobile-friendly alert display with responsive padding
- **Alert Levels**: Supports different alert severity levels (low, high) with distinct styling
- **CORS Support**: Handles cross-origin requests securely
- **Automatic Refresh**: Loads fresh alert data on each page load
- **Accessibility**: Screen reader friendly with proper ARIA labels

## Quick Start

1. **Install the module**:

   ```bash
   composer require howard/howard_special_alerts_feed
   drush en howard_special_alerts_feed
   ```

2. **Place the block**:
   - Go to **Structure** > **Block Layout**
   - Find "Howard Special Alerts Feed" block
   - Place it in your desired region

3. **Verify it's working**:
   - Visit your site's frontend
   - Check for alerts in the configured region
   - Test dismissal functionality

## Documentation

This README provides an overview and basic usage information. For comprehensive documentation, see:

- **[Installation Guide](docs/INSTALL.md)** - Detailed installation instructions and troubleshooting
- **[API Documentation](docs/API.md)** - Complete JavaScript and PHP API reference
- **[Developer Guide](docs/DEVELOPER.md)** - Development setup, customization, and contribution guidelines
- **[Changelog](docs/CHANGELOG.md)** - Version history and upgrade notes

### Quick Links

- **Need help installing?** → [Installation Guide](docs/INSTALL.md)
- **Want to customize?** → [Developer Guide](docs/DEVELOPER.md)
- **Looking for API details?** → [API Documentation](docs/API.md)
- **Upgrading?** → [Changelog](docs/CHANGELOG.md)

## Requirements

This module requires the following:

### Drupal Requirements

- **Drupal Core**: 10.x or 11.x
- **Modules**:
  - `block` (core module)

### Server Requirements

- **PHP**: 7.4 or higher
- **Network**: Outbound HTTPS connections to thedig.howard.edu
- **CORS**: Properly configured CORS headers on thedig.howard.edu

### Browser Requirements

- **JavaScript**: Modern JavaScript support (ES6+)
- **APIs**: Fetch API support
- **Cookies**: Cookie support for dismissal functionality

## Installation

### Via Composer (Recommended)

```bash
composer require howard/howard_special_alerts_feed
```

### Manual Installation

1. Download the module and place it in your `modules/custom/` directory
2. Enable the module via Drupal admin interface or Drush:

```bash
drush en howard_special_alerts_feed
```

### Post-Installation Steps

1. Clear caches:

   ```bash
   drush cr
   ```

2. Configure block permissions if needed

## Configuration

### Block Configuration

1. Navigate to **Structure » Block Layout** (`/admin/structure/block`)
2. Find the "Howard Special Alerts Feed" block
3. Click "Place block" in your desired region
4. Configure block settings:
   - **Visibility**: Set page, role, or other visibility conditions
   - **Region**: Choose where the block appears (typically header or content)

### Block Settings

The block provides informational text and links to help documentation. No additional configuration is typically required as the module automatically:

- Fetches alerts from thedig.howard.edu
- Filters by current date
- Handles dismissal via cookies

### URL Configuration

The module is configured to fetch alerts from:

```text
https://thedig.howard.edu/jsonapi/node/alert
```

With automatic filtering parameters for:

- Start date ≤ current date
- End date ≥ current date
- Status = published

## Usage

### Basic Usage

Once installed and configured, the module automatically:

1. **Fetches Alerts**: On page load, queries thedig.howard.edu for active alerts
2. **Displays Alerts**: Renders alerts as notification bars
3. **Handles Dismissal**: Allows users to dismiss alerts individually
4. **Manages Visibility**: Hides dismissed alerts using cookies

### Alert Structure

Each alert includes:

- **Title**: Main alert message
- **Subtitle**: Additional details (optional)
- **Link**: Either to the full alert page or custom URL
- **Level**: Alert severity (low, high)
- **Dates**: Start and end dates for visibility

### User Interaction

- **Viewing**: Alerts appear as prominent notification bars
- **Dismissing**: Click the X button to dismiss an alert
- **Persistence**: Dismissed alerts remain hidden until cookies expire

## API Reference

The module provides both JavaScript and PHP APIs for advanced customization.

### JavaScript API

The module exposes a `specialAlertsFeed` object with methods for:

- `loadEventData()` - Fetches alert data from thedig.howard.edu
- `checkAlerts(data, site)` - Processes and filters alert data
- `setAlertBars(data)` - Renders alerts to the page
- `hideAlerts()` - Hides alerts when none are active
- `setDismiss()` - Handles alert dismissal
- `setCookie(key, value, days)` - Stores dismissal preferences
- `getCookie(key)` - Retrieves dismissal preferences

### Drupal Integration

The module integrates with Drupal through:

- **Block Plugin**: `SpecialAlertsFeedBlock` class
- **Hooks**: `hook_help()` and `hook_theme()`
- **Libraries**: CSS and JavaScript asset management

### Complete API Documentation

For detailed API documentation including parameters, return values, and examples, see the [API Documentation](docs/API.md).

## Styling

### CSS Classes

The module provides the following CSS classes for styling:

#### Container Classes

- `.alerts-feed-wrapper`: Main container for all alerts
- `.alerts-active`: Added to body when alerts are present
- `.no-alerts`: Added to body when no alerts are active

#### Alert Classes

- `.newsroom-alert`: Individual alert link
- `.newsroom-alert--low`: Low severity alert
- `.newsroom-alert--high`: High severity alert
- `.newsroom-alert-dismiss`: Dismiss button

#### State Classes

- `.hidden`: Applied to dismissed alerts

### Responsive Design

The module includes responsive breakpoints:

- **Mobile** (1px - 1000px): Adjusted padding for smaller screens
- **Tablet** (1000px - 1700px): Percentage-based padding
- **Desktop** (1700px+): Maximum padding for large screens

### Customization

To customize alert styling:

1. **Override CSS**: Add custom styles to your theme
2. **Template Override**: Copy the Twig template to your theme
3. **JavaScript Extension**: Extend the JavaScript object for custom behavior

Example CSS customization:

```css
/* Custom alert colors */
.alerts-feed-wrapper .newsroom-alert--low {
  background: #your-color;
}

.alerts-feed-wrapper .newsroom-alert--high {
  background: #your-urgent-color;
}
```

## Troubleshooting

### Quick Fixes

#### No Alerts Appearing

1. **Check Network**: Verify your server can reach thedig.howard.edu

   ```bash
   curl -I https://thedig.howard.edu/jsonapi/node/alert
   ```

2. **CORS Issues**: Ensure CORS headers are properly configured on thedig.howard.edu
3. **JavaScript Errors**: Check browser console for JavaScript errors
4. **Block Placement**: Verify the block is placed in a visible region

#### Alerts Not Dismissing

1. **Cookie Settings**: Check if cookies are enabled in the browser
2. **JavaScript Errors**: Verify no JavaScript errors are preventing execution
3. **Event Handlers**: Ensure click handlers are properly attached

### Complete Troubleshooting Guide

For comprehensive troubleshooting including:

- Detailed diagnostic steps
- Common installation issues
- Performance optimization
- Debug mode instructions
- Server configuration problems

See the [Installation Guide](docs/INSTALL.md#troubleshooting-installation) for complete troubleshooting documentation.

## Contributing

We welcome contributions to the Howard Special Alerts Feed module!

### Quick Start for Contributors

1. **Fork the repository** on GitHub
2. **Create a feature branch** from the main branch
3. **Make your changes** following our coding standards
4. **Test thoroughly** across different browsers and devices
5. **Submit a pull request** with a clear description

### Development Guidelines

- Follow Drupal coding standards
- Add tests for new functionality
- Update documentation for changes
- Ensure backward compatibility

### Complete Developer Guide

For comprehensive development information including:

- **Development Environment Setup**
- **Module Architecture**
- **Coding Standards**
- **Testing Strategies**
- **Customization Examples**
- **Performance Optimization**
- **Security Best Practices**

See the [Developer Guide](docs/DEVELOPER.md) for complete development documentation.

### Reporting Issues

When reporting issues, please include:

- Drupal version and module version
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Any error messages or screenshots

Submit issues on [GitHub Issues](https://github.com/howard-university-web-services/howard_special_alerts_feed/issues).

## Support

- **Issues**: [GitHub Issues](https://github.com/howard-university-web-services/howard_special_alerts_feed/issues)
- **Source**: [GitHub Repository](https://github.com/howard-university-web-services/howard_special_alerts_feed)
- **Maintainer**: [Dan Rogers](https://www.drupal.org/u/dan_rogers)
- **Documentation**: [Complete Documentation](docs/) - See the docs folder for comprehensive guides

## Changelog

### Version 11.0.2

- Comprehensive documentation suite with organized docs/ folder
- Enhanced JavaScript and CSS documentation following Drupal standards
- Improved code structure and error handling
- Added coding standards document and developer guides

For complete version history, upgrade notes, and migration information, see the [Changelog](docs/CHANGELOG.md).

## License

This project is licensed under the GPL-2.0+ License - see the [LICENSE](LICENSE) file for details.
