<?php

namespace Drupal\howard_special_alerts_feed\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Special alerts feed block
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
    return array(
      'special_alerts_feed_settings_site_url' => '',
    );
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    // General info/help text.
    $form['info_text'] = array(
      '#markup' => '
      <p>This block is a feed of Special Alerts, fed from the Howard Newsroom.
      It displays time sensitive University Information.</p>
      <p>See the <a href="/admin/help/howard_special_alerts_feed">Help Section</a>
      for more information.</p>'
    );
    //General settings fieldset.
    $form['special_alerts_feed_settings'] = array(
      '#type' => 'fieldset',
      '#title' => $this->t('Special Alerts Feed Settings'),
    );

    //URL of the feed API.
    $form['special_alerts_feed_settings']['special_alerts_feed_settings_environment'] = array(
      '#type' => 'select',
      '#title' => $this->t('Alert Environment'),
      '#default_value' => $this->configuration['special_alerts_feed_settings_environment'],
      '#options' => [
        'https://newsroom.howard.edu' => $this
          ->t('Production'),
          'http://stg.newsroom.howard.edu' => $this
          ->t('Staging'),
        'http://dev.newsroom.howard.edu' => $this
          ->t('Development'),
      ],
      '#description' => $this->t('Which Howard Newsroom environment to pull from. Most times, this should be production.'),
      '#required' => TRUE
    );

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
    $build = array();
    $build['content'] = array(
      '#theme' => 'howard_special_alerts_feed_templating',
    );
    $build['#attached']['library'][] = 'howard_special_alerts_feed/howard_special_alerts_feed.alerts_feed';
    $build['#attached']['drupalSettings']['howard_special_alerts_feed'] = array(
      'pathToAlertsFeedList' => $this->configuration['special_alerts_feed_settings_environment'],
      'pathToAlertsFeedModule' => drupal_get_path('module', 'howard_special_alerts_feed'),
    );
    return $build;
  }

}
