# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Enhanced caching mechanism for improved performance
- Additional alert types and styling options
- Integration with other Howard University systems

## [11.0.2] - 2025-07-07

### Added
- Comprehensive documentation suite with organized docs/ folder
- Complete API documentation with detailed method references
- Developer guide with setup instructions and customization examples
- Installation guide with troubleshooting and configuration details
- Coding standards document following Drupal best practices
- Enhanced JavaScript documentation with JSDoc comments
- Improved CSS documentation with detailed component explanations

### Changed
- Reorganized documentation into docs/ folder for better organization
- Enhanced README with quick start guide and documentation links
- Improved JavaScript error handling with informative console messages
- Updated CSS with comprehensive comments and better organization
- Enhanced code structure following Drupal coding standards
- Improved cookie handling with proper path parameters for security

### Fixed
- JavaScript error handling now provides more descriptive error messages
- CSS organization improved with logical grouping and clear sections
- Documentation cross-references updated for new file structure

### Technical Improvements
- Added comprehensive JSDoc documentation to JavaScript files
- Enhanced CSS with detailed component and responsive documentation
- Improved code maintainability with better comments and structure
- Added security improvements to cookie handling
- Enhanced accessibility with better event handling

## [11.0.1] - 2024-07-07

### Added
- Initial release for Drupal 10/11 compatibility
- Core functionality for alert fetching and display
- Responsive design implementation
- Cookie-based dismissal system
- Real-time alert fetching from thedig.howard.edu
- Date-based filtering for active alerts
- Dismissible alert functionality
- Multiple alert severity levels (low, high)
- CORS support for cross-origin requests
- Accessibility features with proper ARIA labels

### Technical Features
- JavaScript-based alert fetching using Fetch API
- Drupal block plugin architecture
- Twig template system for rendering
- CSS styling with responsive breakpoints
- Cookie management for dismissal persistence
- JSON API integration with thedig.howard.edu

### Security
- Proper CORS handling
- Input sanitization
- Secure cookie handling

## [Previous Versions]

### Legacy Support
- Previous versions supported Drupal 8.x and 9.x
- Maintained backward compatibility where possible
- Migrated from older API endpoints to JSON API

## Migration Notes

### From 8.x to 11.x
- Updated for Drupal 10/11 compatibility
- Modernized JavaScript code
- Enhanced responsive design
- Improved accessibility features

### Breaking Changes
- None in this release
- Maintains backward compatibility with existing configurations

## Upgrade Path

### From 8.x/9.x to 11.x
1. Update Drupal core to 10.x or 11.x
2. Update module via Composer
3. Clear caches
4. Verify block placement and configuration
5. Test alert functionality

### Configuration Changes
- No configuration changes required
- Existing block placements will continue to work
- Alert dismissal cookies will be preserved

## Known Issues

### Current Limitations
- Requires active internet connection to thedig.howard.edu
- Depends on external API availability
- No offline fallback mechanism

### Future Enhancements
- Caching mechanism for improved performance
- Offline fallback support
- Enhanced customization options
- Additional alert types and styling
- Integration with other Howard University systems

## Support

For issues, feature requests, or questions:
- [GitHub Issues](https://github.com/howard-university-web-services/howard_special_alerts_feed/issues)
- [GitHub Repository](https://github.com/howard-university-web-services/howard_special_alerts_feed)
- Contact: [Dan Rogers](https://www.drupal.org/u/dan_rogers)
