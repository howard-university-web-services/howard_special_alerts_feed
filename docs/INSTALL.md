# Installation Guide

## Overview

This guide provides step-by-step instructions for installing and configuring the Howard Special Alerts Feed module on your Drupal site.

## Prerequisites

### System Requirements

- **Drupal**: 10.x or 11.x
- **PHP**: 7.4 or higher
- **Web Server**: Apache, Nginx, or IIS
- **Database**: MySQL 5.7+, PostgreSQL, or SQLite

### Network Requirements

- **Outbound HTTPS**: Access to thedig.howard.edu
- **CORS**: Proper CORS configuration on thedig.howard.edu
- **SSL**: HTTPS recommended for production sites

### Browser Requirements

- **JavaScript**: Modern JavaScript support (ES6+)
- **Fetch API**: Native fetch support or polyfill
- **Cookies**: Cookie support for dismissal functionality

## Installation Methods

### Method 1: Composer (Recommended)

This is the recommended method for production sites.

1. **Install via Composer**

   ```bash
   composer require howard/howard_special_alerts_feed
   ```

2. **Enable the Module**

   ```bash
   drush en howard_special_alerts_feed
   ```

   Or via the admin interface:
   - Go to **Extend** (`/admin/modules`)
   - Find "Howard Special Alerts Feed"
   - Check the box and click **Install**

3. **Clear Caches**

   ```bash
   drush cr
   ```

### Method 2: Manual Installation

Use this method if you cannot use Composer.

1. **Download the Module**
   - Download from GitHub releases
   - Extract to `modules/custom/howard_special_alerts_feed`

2. **Set Permissions**

   ```bash
   chmod -R 755 modules/custom/howard_special_alerts_feed
   ```

3. **Enable the Module**

   ```bash
   drush en howard_special_alerts_feed
   ```

4. **Clear Caches**

   ```bash
   drush cr
   ```

### Method 3: Development Installation

For developers contributing to the module.

1. **Clone Repository**

   ```bash
   git clone https://github.com/howard-university-web-services/howard_special_alerts_feed.git
   cd howard_special_alerts_feed
   ```

2. **Install Dependencies**

   ```bash
   composer install
   ```

3. **Link to Drupal**

   ```bash
   ln -sf $(pwd) /path/to/drupal/modules/custom/howard_special_alerts_feed
   ```

4. **Enable and Clear Caches**

   ```bash
   drush en howard_special_alerts_feed
   drush cr
   ```

## Configuration

### Step 1: Place the Block

1. **Navigate to Block Layout**
   - Go to **Structure** > **Block Layout** (`/admin/structure/block`)

2. **Find Your Theme Region**
   - Look for the region where you want alerts to appear
   - Common regions: Header, Content, Sidebar

3. **Place the Block**
   - Click **Place block** in your chosen region
   - Find "Howard Special Alerts Feed" in the list
   - Click **Place block**

### Step 2: Configure Block Settings

1. **Block Configuration**
   - **Title**: Leave blank or set custom title
   - **Display title**: Usually unchecked for alerts
   - **Visibility**: Configure as needed

2. **Pages Configuration**
   - **Show on specific pages**: Configure where alerts appear
   - **Content types**: Limit to specific content types if needed
   - **Roles**: Set which user roles see alerts

3. **Save Configuration**
   - Click **Save block**

### Step 3: Verify Installation

1. **Check Frontend**
   - Visit your site's frontend
   - Look for alerts in the configured region
   - Verify responsive behavior on mobile

2. **Test JavaScript**
   - Open browser developer tools
   - Check for JavaScript errors in console
   - Verify network requests to thedig.howard.edu

3. **Test Dismissal**
   - Click the X button on any alert
   - Refresh the page
   - Verify the alert remains dismissed

## Advanced Configuration

### Custom Regions

To display alerts in a custom region:

1. **Create Custom Region** (in your theme)

   ```php
   // In your theme's .info.yml file
   regions:
     alerts: 'Alerts'
     header: 'Header'
     content: 'Content'
   ```

2. **Add to Template**

   ```twig
   {# In your theme's page.html.twig #}
   {% if page.alerts %}
     <div class="alerts-region">
       {{ page.alerts }}
     </div>
   {% endif %}
   ```

3. **Place Block in New Region**
   - Go to Block Layout
   - Place the alerts block in your new region

### Performance Optimization

1. **Enable Drupal Caching**

   ```bash
   drush config-set system.performance cache.page.max_age 3600
   drush config-set system.performance css.preprocess true
   drush config-set system.performance js.preprocess true
   ```

2. **Configure CDN** (if available)
   - Set up CDN for static assets
   - Configure proper cache headers

3. **Monitor Performance**
   - Use browser developer tools
   - Monitor network requests
   - Check page load times

### Security Configuration

1. **Content Security Policy**

   ```apache
   # In .htaccess or server config
   Header set Content-Security-Policy "connect-src 'self' https://thedig.howard.edu;"
   ```

2. **HTTPS Configuration**
   - Ensure site uses HTTPS
   - Configure proper SSL certificates
   - Enable HSTS if possible

## Troubleshooting Installation

### Common Issues

#### Module Not Found

**Problem**: Module doesn't appear in the modules list

**Solutions**:
- Check file permissions: `chmod -R 755 modules/custom/howard_special_alerts_feed`
- Verify file structure is correct
- Clear caches: `drush cr`
- Check .info.yml file syntax

#### JavaScript Errors

**Problem**: Console shows JavaScript errors

**Solutions**:
- Verify jQuery is loaded
- Check for JavaScript conflicts
- Ensure fetch API is available
- Clear browser cache

#### No Alerts Appearing

**Problem**: Block appears but no alerts show

**Solutions**:
- Check network connectivity to thedig.howard.edu
- Verify CORS headers are set
- Check browser console for errors
- Test API endpoint manually

#### Styling Issues

**Problem**: Alerts don't display correctly

**Solutions**:
- Check for CSS conflicts
- Verify CSS files are loading
- Test with different browsers
- Check responsive behavior

### Diagnostic Commands

```bash
# Check module status
drush pm-list | grep howard_special_alerts_feed

# Clear all caches
drush cr

# Check for errors
drush watchdog:show --type=php

# Test API connectivity
curl -I https://thedig.howard.edu/jsonapi/node/alert
```

### Debug Mode

Enable debug mode for troubleshooting:

```javascript
// Add to browser console
localStorage.setItem('howard_alerts_debug', 'true');
```

## Uninstallation

### Method 1: Drupal Interface

1. **Disable Module**
   - Go to **Extend** (`/admin/modules`)
   - Uncheck "Howard Special Alerts Feed"
   - Click **Uninstall**

2. **Remove Block**
   - Go to **Structure** > **Block Layout**
   - Find the alerts block
   - Click **Remove** or **Disable**

3. **Clear Caches**
   - Go to **Configuration** > **Performance**
   - Click **Clear all caches**

### Method 2: Drush Commands

```bash
# Disable module
drush pm-uninstall howard_special_alerts_feed

# Clear caches
drush cr

# Remove via Composer (if installed via Composer)
composer remove howard/howard_special_alerts_feed
```

### Method 3: Manual Removal

```bash
# Remove module files
rm -rf modules/custom/howard_special_alerts_feed

# Clear caches
drush cr
```

## Maintenance

### Regular Tasks

1. **Update Module**

   ```bash
   composer update howard/howard_special_alerts_feed
   drush cr
   ```

2. **Monitor Performance**
   - Check site speed regularly
   - Monitor JavaScript errors
   - Review alert engagement

3. **Security Updates**
   - Keep Drupal core updated
   - Monitor security advisories
   - Update dependencies regularly

### Backup Considerations

1. **Before Installation**
   - Backup database
   - Backup codebase
   - Document current configuration

2. **Configuration Export**

   ```bash
   drush config-export
   ```

3. **Testing Environment**
   - Test in staging environment first
   - Verify functionality before production
   - Document any issues

## Support

### Getting Help

1. **Documentation**
   - Check README.md for usage information
   - Review API.md for technical details
   - See DEVELOPER.md for customization

2. **Community Support**
   - GitHub Issues for bug reports
   - GitHub Discussions for questions
   - Drupal.org community forums

3. **Professional Support**
   - Contact module maintainer
   - Howard University web services team
   - Drupal consulting services

### Reporting Issues

When reporting installation issues, include:

- Drupal version and installation method
- Module version
- Server environment (PHP, database, web server)
- Error messages (PHP errors, JavaScript errors)
- Steps taken before the issue occurred
- Browser and version information

### Feature Requests

For new features or enhancements:

1. Check existing issues on GitHub
2. Create detailed feature request
3. Explain use case and benefits
4. Provide examples or mockups if helpful

## Next Steps

After successful installation:

1. **Review Documentation**
   - Read the full README.md
   - Understand configuration options
   - Learn about customization possibilities

2. **Test Thoroughly**
   - Test on different devices
   - Verify accessibility
   - Check performance impact

3. **Monitor and Maintain**
   - Set up monitoring
   - Plan regular updates
   - Document any customizations

4. **Consider Enhancements**
   - Review customization options
   - Plan additional features
   - Consider integration with other systems
