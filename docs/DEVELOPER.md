# Developer Guide

## Overview

This guide provides comprehensive information for developers working with the Howard Special Alerts Feed module, including setup, customization, and extension.

## Development Environment Setup

### Prerequisites

- Drupal 10.x or 11.x development environment
- Composer installed
- Git for version control
- Modern web browser with developer tools

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/howard-university-web-services/howard_special_alerts_feed.git
   cd howard_special_alerts_feed
   ```

2. **Install Dependencies**
   ```bash
   composer install
   ```

3. **Enable Module in Drupal**
   ```bash
   drush en howard_special_alerts_feed
   drush cr
   ```

4. **Configure Development Environment**
   - Place block in a visible region
   - Enable browser developer tools
   - Configure CORS for testing

## Module Architecture

### File Structure

```
howard_special_alerts_feed/
├── assets/
│   ├── css/
│   │   └── alerts-feed.css          # Alert styling
│   ├── js/
│   │   └── alerts-feed.js           # Main JavaScript functionality
│   └── templates/
│       └── howard_special_alerts_feed.html.twig  # Alert template
├── src/
│   └── Plugin/
│       └── Block/
│           └── SpecialAlertsFeedBlock.php  # Block plugin
├── composer.json                    # Composer configuration
├── howard_special_alerts_feed.info.yml    # Module definition
├── howard_special_alerts_feed.libraries.yml  # Asset libraries
├── howard_special_alerts_feed.module       # Hook implementations
├── README.md                        # Documentation
├── API.md                          # API documentation
└── CHANGELOG.md                    # Version history
```

### Key Components

1. **Block Plugin** (`SpecialAlertsFeedBlock.php`)
   - Provides the main block functionality
   - Handles configuration and rendering
   - Attaches JavaScript and CSS

2. **JavaScript Module** (`alerts-feed.js`)
   - Fetches data from external API
   - Handles alert rendering and dismissal
   - Manages cookie-based persistence

3. **Twig Template** (`howard_special_alerts_feed.html.twig`)
   - Provides the base HTML structure
   - Minimal template for JavaScript enhancement

4. **CSS Styles** (`alerts-feed.css`)
   - Responsive alert styling
   - Multiple alert severity levels
   - Dismiss button styling

## Code Standards

### PHP Standards

Follow Drupal coding standards:

```php
<?php

namespace Drupal\howard_special_alerts_feed\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a special alerts feed block.
 *
 * @Block(
 *   id = "special_alerts_feed",
 *   admin_label = @Translation("Howard Special Alerts Feed"),
 *   category = @Translation("Howard University")
 * )
 */
class SpecialAlertsFeedBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    // Implementation here
  }

}
```

### JavaScript Standards

Use modern JavaScript with proper structure:

```javascript
(function () {
  'use strict';

  /**
   * Special alerts feed functionality.
   */
  let specialAlertsFeed = {
    
    /**
     * Initialize the alerts feed.
     */
    init: function() {
      this.loadEventData();
    },

    /**
     * Load event data from API.
     */
    loadEventData: function() {
      // Implementation
    }
  };

  // Initialize when ready
  specialAlertsFeed.init();
})();
```

### CSS Standards

Use BEM methodology for class naming:

```css
/* Block */
.alerts-feed-wrapper {
  /* Block styles */
}

/* Element */
.alerts-feed-wrapper__alert {
  /* Element styles */
}

/* Modifier */
.alerts-feed-wrapper__alert--high {
  /* Modifier styles */
}
```

## Customization Guide

### Extending the JavaScript

Add custom functionality by extending the global object:

```javascript
// In your theme's JavaScript file
(function () {
  'use strict';

  // Extend the existing object
  if (typeof specialAlertsFeed !== 'undefined') {
    
    // Add custom method
    specialAlertsFeed.customMethod = function() {
      // Your custom functionality
    };

    // Override existing method
    let originalSetAlertBars = specialAlertsFeed.setAlertBars;
    specialAlertsFeed.setAlertBars = function(data) {
      // Custom pre-processing
      console.log('Processing alerts:', data);
      
      // Call original method
      originalSetAlertBars.call(this, data);
      
      // Custom post-processing
      this.customMethod();
    };
  }
})();
```

### Custom CSS Styling

Override default styles in your theme:

```css
/* Custom alert colors */
.alerts-feed-wrapper .newsroom-alert--emergency {
  background: #ff0000;
  color: #ffffff;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

/* Custom responsive behavior */
@media (max-width: 768px) {
  .alerts-feed-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
}
```

### Template Overrides

Copy the template to your theme for customization:

```bash
# Copy to your theme's templates directory
cp modules/custom/howard_special_alerts_feed/assets/templates/howard_special_alerts_feed.html.twig themes/your_theme/templates/
```

Customize the template:

```twig
{#
/**
 * @file
 * Custom template for Howard Special Alerts Feed.
 */
#}
<div id="howard_special_alerts_feed" class="alerts-feed-wrapper custom-alerts">
  <div class="alerts-header">
    <h2>Important Alerts</h2>
  </div>
  <div class="alerts-content">
    <!-- JavaScript will populate this area -->
  </div>
</div>
```

### Creating Derivative Blocks

Create a custom block that extends the base functionality:

```php
<?php

namespace Drupal\your_module\Plugin\Block;

use Drupal\howard_special_alerts_feed\Plugin\Block\SpecialAlertsFeedBlock;

/**
 * Provides a custom alerts feed block.
 *
 * @Block(
 *   id = "custom_alerts_feed",
 *   admin_label = @Translation("Custom Alerts Feed"),
 *   category = @Translation("Custom")
 * )
 */
class CustomAlertsFeedBlock extends SpecialAlertsFeedBlock {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = parent::build();
    
    // Add custom functionality
    $build['#attached']['library'][] = 'your_module/custom_alerts';
    $build['#attached']['drupalSettings']['customAlerts'] = [
      'customSetting' => 'custom_value',
    ];
    
    return $build;
  }

}
```

## Testing

### Manual Testing

1. **Basic Functionality**
   - Enable module and place block
   - Verify alerts load from API
   - Test alert dismissal
   - Check responsive behavior

2. **Browser Testing**
   - Test across different browsers
   - Verify mobile responsiveness
   - Check JavaScript console for errors

3. **Network Testing**
   - Test with slow connections
   - Verify behavior when API is unavailable
   - Check CORS functionality

### Automated Testing

Create PHPUnit tests for the block plugin:

```php
<?php

namespace Drupal\Tests\howard_special_alerts_feed\Unit\Plugin\Block;

use Drupal\Tests\UnitTestCase;
use Drupal\howard_special_alerts_feed\Plugin\Block\SpecialAlertsFeedBlock;

/**
 * Tests for SpecialAlertsFeedBlock.
 *
 * @group howard_special_alerts_feed
 */
class SpecialAlertsFeedBlockTest extends UnitTestCase {

  /**
   * Test block build method.
   */
  public function testBuild() {
    $block = new SpecialAlertsFeedBlock([], 'special_alerts_feed', []);
    $build = $block->build();
    
    $this->assertIsArray($build);
    $this->assertArrayHasKey('content', $build);
    $this->assertArrayHasKey('#attached', $build);
  }

}
```

### JavaScript Testing

Use browser-based testing:

```javascript
// Test suite for alert functionality
describe('Special Alerts Feed', function() {
  
  beforeEach(function() {
    // Setup test environment
    document.body.innerHTML = '<div id="howard_special_alerts_feed"></div>';
  });

  it('should load alert data', function() {
    // Mock API response
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      json: () => Promise.resolve({ data: [] })
    }));
    
    specialAlertsFeed.loadEventData();
    
    expect(fetch).toHaveBeenCalled();
  });

  it('should set alert bars', function() {
    const testData = [{
      id: 'test-123',
      attributes: {
        title: 'Test Alert',
        field_alert_level: 'high'
      },
      env: 'https://test.com'
    }];
    
    specialAlertsFeed.setAlertBars(testData);
    
    const alerts = document.querySelectorAll('.newsroom-alert');
    expect(alerts.length).toBe(1);
  });

});
```

## Performance Optimization

### Caching Strategies

1. **Server-side Caching**
   ```php
   // In your custom module
   use Drupal\Core\Cache\CacheBackendInterface;
   
   public function getCachedAlerts() {
     $cache = \Drupal::cache();
     $cid = 'howard_alerts:' . date('Y-m-d-H');
     
     if ($cached = $cache->get($cid)) {
       return $cached->data;
     }
     
     // Fetch fresh data
     $data = $this->fetchAlertsFromAPI();
     
     // Cache for 1 hour
     $cache->set($cid, $data, strtotime('+1 hour'));
     
     return $data;
   }
   ```

2. **Client-side Caching**
   ```javascript
   // Add to your JavaScript
   const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
   
   loadEventData: function() {
     const cached = localStorage.getItem('howard_alerts_cache');
     const cacheTime = localStorage.getItem('howard_alerts_cache_time');
     
     if (cached && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
       this.checkAlerts(JSON.parse(cached), site);
       return;
     }
     
     // Fetch fresh data
     this.fetchFromAPI();
   }
   ```

### Load Time Optimization

1. **Lazy Loading**
   ```javascript
   // Load alerts after page load
   window.addEventListener('load', function() {
     setTimeout(function() {
       specialAlertsFeed.loadEventData();
     }, 100);
   });
   ```

2. **Minification**
   - Minify JavaScript and CSS files
   - Use Drupal's aggregation features
   - Consider using a build process

## Debugging

### Debug Mode

Enable debug mode for development:

```javascript
// Add to your JavaScript
const DEBUG = true;

function debugLog(message, data) {
  if (DEBUG) {
    console.log('[Howard Alerts]', message, data);
  }
}

// Use throughout your code
debugLog('Loading alerts data');
debugLog('Alert data received:', data);
```

### Common Issues

1. **CORS Errors**
   - Verify CORS headers on thedig.howard.edu
   - Test with browser developer tools
   - Check network tab for failed requests

2. **JavaScript Errors**
   - Check browser console
   - Verify all dependencies are loaded
   - Test with different browsers

3. **Styling Issues**
   - Check for CSS conflicts
   - Verify responsive behavior
   - Test with different screen sizes

### Development Tools

Recommended browser extensions:

- **Web Developer** - For CSS/HTML debugging
- **JSON Viewer** - For API response inspection
- **CORS Everywhere** - For CORS testing (development only)

## Deployment

### Pre-deployment Checklist

- [ ] Code follows Drupal standards
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Version numbers are incremented
- [ ] Security review completed

### Deployment Process

1. **Create Release**
   ```bash
   git tag -a v11.0.2 -m "Release version 11.0.2"
   git push origin v11.0.2
   ```

2. **Update Packagist**
   - Package will auto-update via GitHub webhook
   - Verify new version appears on Packagist

3. **Update Documentation**
   - Update README if needed
   - Update API documentation
   - Update changelog

## Security Considerations

### Input Validation

Always validate external data:

```javascript
// Validate alert data
function validateAlert(alert) {
  if (!alert || !alert.id || !alert.attributes) {
    return false;
  }
  
  if (!alert.attributes.title || typeof alert.attributes.title !== 'string') {
    return false;
  }
  
  return true;
}
```

### XSS Prevention

Use proper escaping:

```javascript
// Safe HTML insertion
function safeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Use when setting content
element.innerHTML = safeHTML(alertData.title);
```

### CSRF Protection

For forms, always use Drupal's CSRF protection:

```php
$form['#token'] = 'howard_alerts_form';
```

## Contributing

### Code Review Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-functionality
   ```

2. **Make Changes**
   - Follow coding standards
   - Add tests for new functionality
   - Update documentation

3. **Submit Pull Request**
   - Include detailed description
   - Reference related issues
   - Ensure all tests pass

### Release Process

1. **Version Numbering**
   - Follow semantic versioning
   - Update composer.json
   - Update .info.yml file

2. **Documentation Updates**
   - Update README.md
   - Update CHANGELOG.md
   - Update API documentation

3. **Testing**
   - Run all tests
   - Manual testing across browsers
   - Performance testing

## Future Enhancements

### Planned Features

1. **Enhanced Caching**
   - Server-side caching implementation
   - Smart cache invalidation
   - Performance monitoring

2. **Additional Alert Types**
   - Weather alerts
   - Emergency notifications
   - Academic calendar alerts

3. **Configuration Options**
   - Customizable API endpoints
   - Alert filtering options
   - Display customization

### Extension Points

Areas for future development:

1. **Plugin Architecture**
   - Alert source plugins
   - Display formatter plugins
   - Filter plugins

2. **Integration Options**
   - Drupal message system
   - Email notifications
   - Mobile app integration

3. **Analytics**
   - Alert engagement tracking
   - Performance metrics
   - User behavior analysis

## Support

### Getting Help

- **Documentation**: Check README.md and API.md
- **Issues**: Use GitHub Issues for bug reports
- **Development**: Join development discussions

### Contributing Code

- **Fork**: Create a fork on GitHub
- **Branch**: Create feature branches
- **Pull Request**: Submit PRs with clear descriptions
- **Testing**: Ensure all tests pass

### Reporting Issues

When reporting issues, include:

- Drupal version
- Module version
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Any error messages
- Screenshots if applicable
