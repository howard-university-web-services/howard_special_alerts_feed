<?php

namespace Drupal\howard_special_alerts_feed\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a Howard Special Alerts Feed block.
 *
 * This block fetches and displays special alerts from thedig.howard.edu
 * using JavaScript. The alerts are rendered as dismissible notification bars
 * with support for different severity levels.
 *
 * Features:
 * - Automatic alert fetching from external API
 * - Date-based filtering for active alerts
 * - User dismissal with cookie persistence
 * - Responsive design
 * - Multiple alert severity levels (low, high)
 * - Accessibility support
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
   *
   * Provides default configuration for the block.
   * Currently stores site URL configuration.
   */
  public function defaultConfiguration() {
    return [
      'special_alerts_feed_settings_site_url' => '',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {

    // General info/help text.
    $form['info_text'] = [
      '#markup' => '
      <p>This block is a feed of Special Alerts, fed from the Dig.
      It displays time sensitive University Information.</p>
      <p>See the <a href="/admin/help/howard_special_alerts_feed">Help Section</a>
      for more information.</p>',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $set = 'special_alerts_feed_settings';
    $env = 'special_alerts_feed_settings_environment';
    $env_settings = $form_state->getValue([$set, $env]);
    $this->configuration['special_alerts_feed_settings_environment'] = $env_settings;
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['content'] = [
      '#theme' => 'howard_special_alerts_feed_templating',
    ];
    $build['#attached']['library'][] = 'howard_special_alerts_feed/howard_special_alerts_feed.alerts_feed';
    $build['#attached']['drupalSettings']['howard_special_alerts_feed'] = [
      'pathToAlertsFeedModule' => \Drupal::service('extension.path.resolver')->getPath('module', 'howard_special_alerts_feed'),
    ];
    return $build;
  }

}
