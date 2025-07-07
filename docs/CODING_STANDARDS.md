# Code Standards

## Overview

This document outlines the code standards used in the Howard Special Alerts Feed module. Following these standards ensures maintainability, readability, and consistency across the codebase.

## PHP Standards

### Drupal Coding Standards

The module follows [Drupal Coding Standards](https://www.drupal.org/docs/develop/standards) for all PHP code.

#### Key Requirements

- **Indentation**: 2 spaces (no tabs)
- **Line Length**: Maximum 80 characters where possible
- **Naming Conventions**: 
  - Functions: `snake_case`
  - Classes: `PascalCase`
  - Variables: `snake_case`
  - Constants: `UPPER_CASE`

#### Documentation Standards

```php
/**
 * Brief description of the function.
 *
 * Longer description if needed, explaining the purpose
 * and any important details.
 *
 * @param string $parameter
 *   Description of the parameter.
 * @param array $options
 *   Optional. Array of options with keys:
 *   - key1: Description of key1.
 *   - key2: Description of key2.
 *
 * @return array
 *   Description of the return value.
 *
 * @throws \Exception
 *   When something goes wrong.
 *
 * @see hook_example()
 * @see SomeClass::method()
 */
function example_function($parameter, array $options = []) {
  // Implementation
}
```

#### Class Documentation

```php
/**
 * Provides a special alerts feed block.
 *
 * This block fetches and displays special alerts from thedig.howard.edu
 * using JavaScript. The alerts are rendered as dismissible notification bars
 * with support for different severity levels.
 *
 * @Block(
 *   id = "special_alerts_feed",
 *   admin_label = @Translation("Howard Special Alerts Feed"),
 *   category = @Translation("Howard University")
 * )
 */
class SpecialAlertsFeedBlock extends BlockBase {
  // Implementation
}
```

## CSS Standards

### Drupal CSS Standards

The module follows [Drupal CSS Standards](https://www.drupal.org/docs/develop/standards/css) and includes additional documentation practices.

#### Key Requirements

- **Indentation**: 2 spaces
- **Property Order**: Alphabetical within logical groups
- **Naming**: BEM methodology where appropriate
- **Comments**: Comprehensive documentation

#### Documentation Standards

```css
/**
 * @file
 * Brief description of the stylesheet.
 *
 * Longer description explaining the purpose and scope
 * of the styles contained in this file.
 *
 * @see related-file.css
 * @see module-name.module
 */

/**
 * Component or section description.
 *
 * Explanation of what this section styles and any
 * important implementation details.
 */
.component-name {
  /* Properties in logical order */
  display: block;
  position: relative;
  
  /* Box model */
  margin: 10px;
  padding: 20px;
  
  /* Visual */
  background: #fff;
  border: 1px solid #ccc;
  color: #333;
}

/**
 * Responsive adjustments.
 *
 * Description of the responsive behavior.
 */
@media screen and (min-width: 768px) {
  .component-name {
    font-size: 18px;
  }
}
```

#### BEM Methodology

```css
/* Block */
.alerts-feed-wrapper {
  /* Block styles */
}

/* Element */
.alerts-feed-wrapper__item {
  /* Element styles */
}

/* Modifier */
.alerts-feed-wrapper--compact {
  /* Modifier styles */
}
```

## JavaScript Standards

### Drupal JavaScript Standards

The module follows [Drupal JavaScript Standards](https://www.drupal.org/docs/develop/standards/javascript) with ES6+ features.

#### Key Requirements

- **Indentation**: 2 spaces
- **Semicolons**: Always use semicolons
- **Quotes**: Single quotes for strings
- **Strict Mode**: Always use 'use strict'
- **IIFE**: Wrap code in immediately invoked function expressions

#### Documentation Standards

```javascript
/**
 * @file
 * Brief description of the JavaScript file.
 *
 * Longer description explaining the purpose and functionality
 * of the JavaScript code in this file.
 *
 * @see related-file.js
 * @see module-name.module
 */

(function () {
  'use strict';

  /**
   * Object or namespace description.
   *
   * Explanation of the object's purpose and usage.
   */
  let objectName = {

    /**
     * Method description.
     *
     * Longer description of what the method does, including
     * any important implementation details.
     *
     * @param {string} parameter
     *   Description of the parameter.
     * @param {Object} options
     *   Optional configuration object.
     * @param {string} options.key1
     *   Description of key1.
     * @param {number} options.key2
     *   Description of key2.
     *
     * @returns {boolean}
     *   Description of return value.
     */
    methodName: function (parameter, options = {}) {
      // Implementation with clear comments
      
      // Process the parameter
      let processedValue = this.processParameter(parameter);
      
      // Return the result
      return processedValue.isValid;
    },

    /**
     * Helper method description.
     *
     * @param {string} value
     *   Value to process.
     *
     * @returns {Object}
     *   Processed value object.
     */
    processParameter: function (value) {
      return {
        original: value,
        isValid: value.length > 0
      };
    }
  };

  // Initialize the functionality
  objectName.init();
})();
```

#### Error Handling

```javascript
// Good: Comprehensive error handling
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    this.processData(data);
  })
  .catch(error => {
    console.error('Module Name: Error fetching data:', error);
    this.handleError(error);
  });

// Good: Input validation
methodName: function (parameter) {
  if (typeof parameter !== 'string') {
    console.error('Module Name: Invalid parameter type');
    return false;
  }
  
  if (parameter.length === 0) {
    console.warn('Module Name: Empty parameter provided');
    return false;
  }
  
  // Process the parameter
  return this.processParameter(parameter);
}
```

## File Organization

### Directory Structure

```
module_name/
├── assets/                    # Static assets
│   ├── css/                  # Stylesheets
│   │   └── module-name.css
│   ├── js/                   # JavaScript files
│   │   └── module-name.js
│   └── templates/            # Twig templates
│       └── template-name.html.twig
├── config/                   # Configuration files
│   ├── install/             # Installation config
│   └── schema/              # Schema definitions
├── docs/                     # Documentation
│   ├── API.md
│   ├── CHANGELOG.md
│   ├── DEVELOPER.md
│   └── INSTALL.md
├── src/                      # PHP source code
│   └── Plugin/
│       └── Block/
│           └── ModuleBlock.php
├── composer.json             # Composer configuration
├── module_name.info.yml      # Module definition
├── module_name.libraries.yml # Asset libraries
├── module_name.module        # Hook implementations
└── README.md                 # Main documentation
```

### Naming Conventions

#### Files and Directories

- **PHP files**: `PascalCase.php`
- **CSS files**: `kebab-case.css`
- **JavaScript files**: `kebab-case.js`
- **Template files**: `kebab-case.html.twig`
- **Directories**: `lowercase` or `kebab-case`

#### Classes and Functions

- **Classes**: `PascalCase`
- **Functions**: `snake_case`
- **Methods**: `camelCase`
- **Constants**: `UPPER_CASE`

## Version Control Standards

### Commit Messages

Use clear, descriptive commit messages:

```
feat: Add new alert dismissal functionality

- Implement cookie-based dismissal persistence
- Add dismiss button styling
- Update JavaScript to handle dismissal events

Fixes #123
```

### Commit Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes
- **refactor**: Code refactoring
- **test**: Test additions or changes
- **chore**: Maintenance tasks

### Branch Naming

- **Feature branches**: `feature/description`
- **Bug fix branches**: `fix/issue-description`
- **Documentation branches**: `docs/update-description`

## Testing Standards

### PHP Testing

```php
/**
 * Tests for SpecialAlertsFeedBlock.
 *
 * @group howard_special_alerts_feed
 */
class SpecialAlertsFeedBlockTest extends UnitTestCase {

  /**
   * Test the build method.
   */
  public function testBuild() {
    $block = new SpecialAlertsFeedBlock([], 'special_alerts_feed', []);
    $build = $block->build();
    
    $this->assertIsArray($build);
    $this->assertArrayHasKey('content', $build);
  }
}
```

### JavaScript Testing

```javascript
/**
 * Test suite for special alerts feed.
 */
describe('Special Alerts Feed', function() {
  
  beforeEach(function() {
    // Setup test environment
    document.body.innerHTML = '<div id="howard_special_alerts_feed"></div>';
  });

  it('should process alert data correctly', function() {
    const testData = [{
      id: 'test-123',
      attributes: {
        title: 'Test Alert',
        field_alert_level: 'high'
      }
    }];
    
    specialAlertsFeed.checkAlerts(testData, 'https://test.com');
    
    expect(document.querySelectorAll('.newsroom-alert').length).toBe(1);
  });
});
```

## Documentation Standards

### README Structure

1. **Title and badges**
2. **Quick description**
3. **Table of contents**
4. **Features**
5. **Quick start**
6. **Documentation links**
7. **Requirements**
8. **Installation**
9. **Configuration**
10. **Usage**
11. **API reference**
12. **Troubleshooting**
13. **Contributing**
14. **License**

### API Documentation

- **Complete parameter documentation**
- **Return value descriptions**
- **Usage examples**
- **Error handling information**
- **Cross-references to related functions**

### Code Comments

- **File headers**: Purpose and overview
- **Function headers**: Complete documentation
- **Inline comments**: Explain complex logic
- **Section comments**: Organize code blocks

## Performance Standards

### CSS Performance

- **Minimize selectors**: Use efficient selectors
- **Avoid !important**: Use specific selectors instead
- **Optimize images**: Use appropriate formats and sizes
- **Minimize HTTP requests**: Combine files when possible

### JavaScript Performance

- **Minimize DOM queries**: Cache DOM elements
- **Use event delegation**: For dynamic content
- **Avoid global variables**: Use namespaces
- **Optimize loops**: Use efficient iteration methods

### PHP Performance

- **Database queries**: Use efficient queries
- **Caching**: Implement appropriate caching
- **Memory usage**: Avoid memory leaks
- **Error handling**: Graceful error handling

## Security Standards

### Input Validation

```php
// PHP input validation
function validateInput($input) {
  if (!is_string($input)) {
    throw new InvalidArgumentException('Input must be a string');
  }
  
  return filter_var($input, FILTER_SANITIZE_STRING);
}
```

### Output Escaping

```php
// PHP output escaping
echo Html::escape($user_input);
```

```javascript
// JavaScript output escaping
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### Data Validation

- **Server-side validation**: Always validate on server
- **Client-side validation**: For user experience only
- **Sanitization**: Clean all user inputs
- **Validation**: Verify data format and constraints

## Accessibility Standards

### HTML Standards

- **Semantic markup**: Use appropriate HTML elements
- **ARIA labels**: Add labels for screen readers
- **Keyboard navigation**: Ensure keyboard accessibility
- **Color contrast**: Meet WCAG guidelines

### CSS Standards

- **Focus indicators**: Visible focus states
- **Responsive design**: Mobile-friendly layouts
- **Text sizing**: Scalable text
- **Color usage**: Don't rely on color alone

### JavaScript Standards

- **Keyboard events**: Handle keyboard interactions
- **Screen reader support**: Announce dynamic changes
- **Error messages**: Accessible error reporting
- **Progressive enhancement**: Work without JavaScript

## Maintenance Standards

### Code Review Process

1. **Functionality**: Does it work as expected?
2. **Standards**: Does it follow coding standards?
3. **Security**: Are there security concerns?
4. **Performance**: Is it optimized?
5. **Documentation**: Is it properly documented?
6. **Testing**: Are there adequate tests?

### Update Process

1. **Version control**: Use semantic versioning
2. **Changelog**: Document all changes
3. **Migration**: Provide upgrade paths
4. **Testing**: Test all functionality
5. **Documentation**: Update documentation

### Deprecation Process

1. **Notice**: Add deprecation warnings
2. **Documentation**: Update documentation
3. **Timeline**: Provide removal timeline
4. **Alternatives**: Suggest replacements
5. **Removal**: Remove in next major version

This document serves as a comprehensive guide for maintaining code quality and consistency across the Howard Special Alerts Feed module.
