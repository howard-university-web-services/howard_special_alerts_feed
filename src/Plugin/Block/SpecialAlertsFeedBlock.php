<?php

namespace Drupal\howard_special_alerts_feed\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Special alerts feed block.
 *
 * @Block(
 *   id = "special_alerts_feed",
 *   admin_label = @Translation("Howard Special Alerts Feed")
 * )
 */
class SpecialAlertsFeedBlock extends BlockBase {

  /**
   * {@inheritdoc}
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
    $this->configuration['special_alerts_feed_settings_environment'] = $form_state->getValue(['special_alerts_feed_settings', 'special_alerts_feed_settings_environment']);
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
      'pathToAlertsFeedModule' => drupal_get_path('module', 'howard_special_alerts_feed'),
    ];
    return $build;
  }

}
