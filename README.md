INTRODUCTION
------------

This module is designed to display special alerts for Howard University, on any
Drupal site. It creates a block, which can then be placed in whatever region you
desire. This module relies on a handlebars template, which then renders the HTML.

REQUIREMENTS
------------

This module requires the following modules:

* block

INSTALLATION
------------

* Install as you would normally install a contributed Drupal module. See:
  https://www.drupal.org/docs/8/extending-drupal-8/installing-modules
  for further information.

CONFIGURATION
-------------

* Configure user permissions in
  Structure » Block Layout » Howard Special Alerts Feed:
  (admin/structure/block/manage/howardspecialalertsfeed)
  - Site URL: This is the URL of the MASTER install, likely http://newsroom.howard.edu
    unless otherwise specified.


TROUBLESHOOTING
---------------

If you are running into errors, be sure to check that CORS is running on the
MASTER install, and that you can ping your endpoints.
