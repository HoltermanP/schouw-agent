import { test, expect } from '@playwright/test';

test.describe('Schouw Agent E2E Flow', () => {
  test('should complete full schouw workflow', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Schouw Agent/);

    // Check if we're on the dashboard
    await expect(page.locator('h1')).toContainText('Dashboard');

    // Click "Nieuw Project" button
    await page.click('text=Nieuw Project');

    // Fill in project form
    await page.fill('input[name="naam"]', 'E2E Test Project');
    await page.fill('input[name="opdrachtgever"]', 'Test Opdrachtgever');
    await page.fill('input[name="adres"]', 'Teststraat 123');
    await page.fill('input[name="postcode"]', '1234 AB');
    await page.fill('input[name="plaats"]', 'Teststad');
    await page.fill('input[name="kabellengte"]', '100');
    await page.fill('input[name="capaciteit"]', '25');

    // Select utilities
    await page.check('input[id="elektra"]');
    await page.check('input[id="gas"]');

    // Fill contact information
    await page.fill('input[name="uitvoerder"]', 'Test Uitvoerder');
    await page.fill('input[name="toezichthouder"]', 'Test Toezichthouder');
    await page.fill('input[name="bereikbaarheden"]', '06-12345678');

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to project detail page
    await expect(page).toHaveURL(/\/projects\/\d+/);
    await expect(page.locator('h1')).toContainText('E2E Test Project');

    // Navigate to photos tab
    await page.click('text=Foto\'s');

    // Check if upload areas are visible
    await expect(page.locator('text=meterkast')).toBeVisible();
    await expect(page.locator('text=gebouw')).toBeVisible();
    await expect(page.locator('text=locatie')).toBeVisible();

    // Navigate to analysis tab
    await page.click('text=Analyse');

    // Should show "Nog geen AI-analyse" message
    await expect(page.locator('text=Nog geen AI-analyse')).toBeVisible();

    // Navigate to report tab
    await page.click('text=Rapport');

    // Should show "Nog geen rapport" message
    await expect(page.locator('text=Nog geen rapport')).toBeVisible();

    // Click "Basis Rapport Genereren"
    await page.click('text=Basis Rapport Genereren');

    // Should show report editor
    await expect(page.locator('textarea')).toBeVisible();

    // Navigate to PDF tab
    await page.click('text=PDF');

    // Should show PDF generation options
    await expect(page.locator('text=PDF Rapport')).toBeVisible();
  });

  test('should handle form validation', async ({ page }) => {
    await page.goto('/projects/new');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Should show validation errors
    await expect(page.locator('text=Projectnaam is verplicht')).toBeVisible();
    await expect(page.locator('text=Opdrachtgever is verplicht')).toBeVisible();
    await expect(page.locator('text=Adres is verplicht')).toBeVisible();
  });

  test('should handle invalid postal code', async ({ page }) => {
    await page.goto('/projects/new');

    // Fill form with invalid postal code
    await page.fill('input[name="naam"]', 'Test Project');
    await page.fill('input[name="opdrachtgever"]', 'Test Client');
    await page.fill('input[name="adres"]', 'Teststraat 123');
    await page.fill('input[name="postcode"]', 'invalid');
    await page.fill('input[name="plaats"]', 'Teststad');
    await page.fill('input[name="kabellengte"]', '100');
    await page.fill('input[name="capaciteit"]', '25');
    await page.check('input[id="elektra"]');
    await page.fill('input[name="uitvoerder"]', 'Test Uitvoerder');
    await page.fill('input[name="toezichthouder"]', 'Test Toezichthouder');
    await page.fill('input[name="bereikbaarheden"]', '06-12345678');

    await page.click('button[type="submit"]');

    // Should show postal code validation error
    await expect(page.locator('text=Ongeldige postcode')).toBeVisible();
  });
});
