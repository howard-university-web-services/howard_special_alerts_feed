# Howard Special Alerts Feed

This module is designed to display special alerts for Howard University, on any
Drupal site. It creates a block, which can then be placed in whatever region you
desire. This module relies on a handlebars template, which then renders the HTML.

## Requirements

This module requires the following modules:

- block

## Installation and updates

### Install Via Composer

- `composer install howard/howard_special_alerts_feed`

### Update Via Composer

- `composer update howard/howard_special_alerts_feed`

## Configuration

- Configure user permissions in
  Structure » Block Layout » Howard Special Alerts Feed:
  (admin/structure/block/manage/howardspecialalertsfeed)
- Site URL: This is the URL of the MASTER install, likely http://newsroom.howard.edu
  unless otherwise specified.

## Troubleshooting

If you are running into errors, be sure to check that CORS is running on the
MASTER install, and that you can ping your endpoints.
