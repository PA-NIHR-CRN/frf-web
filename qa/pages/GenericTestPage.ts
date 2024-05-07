import { expect, Locator, Page } from '@playwright/test'

import { getTextFromElementArray } from '../utils/UtilFunctions'

//Declare Page Objects
export default class GenericTestPage {
  readonly page: Page
  readonly imageElement: Locator
  readonly pageHeadingTwo: Locator
  readonly pageHeadingThree: Locator
  readonly pageHeadingFour: Locator
  readonly introParagraph: Locator
  readonly bulletList: Locator
  readonly numberedList: Locator
  readonly linkText: Locator
  readonly lineSeparator: Locator
  readonly videoCoverImageElement: Locator
  readonly videoElement: Locator
  readonly primaryButton: Locator
  readonly secondaryButton: Locator
  readonly contactBlock: Locator
  readonly contactBlockTitle: Locator
  readonly contactBlockText: Locator
  readonly contactBlockButton: Locator
  readonly acceptCookieButton: Locator
  readonly hideCookieMsgButton: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.imageElement = page.locator('img[alt="Image of girl standing in front of burning house"]')
    this.pageHeadingTwo = page.locator('h2[class="govuk-heading-l"] u')
    this.pageHeadingThree = page.locator('h3[class="govuk-heading-m"] u')
    this.pageHeadingFour = page.locator('h4[class="govuk-heading-s"] u')
    this.introParagraph = page.locator('p', { hasText: 'Introduction' })
    this.bulletList = page.locator('ul[class="govuk-list govuk-list--bullet"]')
    this.numberedList = page.locator('ol[class="govuk-list govuk-list--number"]')
    this.linkText = page.locator('a', { hasText: 'This is link text' })
    this.lineSeparator = page.locator('hr')
    this.videoCoverImageElement = page.locator('img[alt="Test Video"]')
    this.videoElement = page.locator('iframe[title="Test Video"]')
    this.primaryButton = page.locator('a[class="govuk-button govuk-!-margin-top-3"]')
    this.secondaryButton = page.locator('a[class="govuk-button govuk-!-margin-top-3 govuk-button--secondary"]')
    this.contactBlock = page.locator('div[data-testid="sidebar-column"]')
    this.contactBlockTitle = page.locator('h3[class="govuk-heading-m heading-underscore mb-0 text-navy-100"]')
    this.contactBlockText = page.locator('div[class="flex flex-grow flex-col items-start justify-between pt-4"] p')
    this.contactBlockButton = page.locator('a[class="govuk-button govuk-button--secondary mb-0 mt-2 text-left"]')
    this.acceptCookieButton = page.locator('button[value="accept"]')
    this.hideCookieMsgButton = page.locator('button[class="govuk-button"]')
  }

  //Page Methods
  async goto(path: string) {
    await this.page.goto(path)
  }

  async assertOnTestPage() {
    await expect(this.page).toHaveURL(/.*\/chris-testing-page/)
    expect(await this.page.title()).toEqual('Chris Testing Page - Find, Recruit and Follow-up')
  }

  async assertOnAltTestPage() {
    await expect(this.page).toHaveURL(/.*\/numbered-list-example/)
    expect(await this.page.title()).toEqual('Numbered List Example - Find, Recruit and Follow-up')
  }

  async assertPageHeadingsAppear() {
    await expect(this.pageHeadingTwo).toBeVisible()
    await expect(this.pageHeadingThree).toBeVisible()
    await expect(this.pageHeadingFour).toBeVisible()
    await expect(this.pageHeadingTwo).toHaveText('Chris Testing Page Heading 2')
    await expect(this.pageHeadingThree).toHaveText('Chris Testing Page Heading 3')
    await expect(this.pageHeadingFour).toHaveText('Chris Testing Page Heading 4')
  }

  async assertIntroAppears() {
    await expect(this.introParagraph).toBeVisible()
    await expect(this.introParagraph).toHaveText('Normal Introduction Text')
  }

  async assertBulletListAppears() {
    await expect(this.bulletList).toBeVisible()
    const arrBulletPointText = await getTextFromElementArray(await this.bulletList.locator('span').all())
    expect(arrBulletPointText.at(0)).toEqual('Bullet List point 1')
    expect(arrBulletPointText.at(1)).toEqual('Bullet List point 2')
  }

  async assertNumberedListAppears() {
    await expect(this.numberedList).toBeVisible()
    const arrNumberedPointText = await getTextFromElementArray(await this.numberedList.locator('p').all())
    expect(arrNumberedPointText.at(0)).toEqual('Numbered List Point 1')
    expect(arrNumberedPointText.at(1)).toEqual('Numbered List Point 2')
    expect(arrNumberedPointText.at(2)).toEqual('Numbered List Point 3')
  }

  async assertHyperlinkAppears() {
    await expect(this.linkText).toBeVisible()
    await expect(this.linkText).toHaveText('This is link text')
  }

  async assertSeparatorsAppear() {
    await expect(this.lineSeparator.first()).toBeVisible()
    await expect(this.lineSeparator).toHaveCount(2)
  }

  async assertImageAppears() {
    await expect(this.imageElement).toBeVisible()
  }

  async assertVideoAppears() {
    await expect(this.videoCoverImageElement).toBeVisible()
    this.videoCoverImageElement.click()
    await expect(this.videoElement).toBeVisible()
  }

  async assertPrimaryButtonAppears() {
    await expect(this.primaryButton).toBeVisible()
    await expect(this.primaryButton).toContainText('Visit NIHR Learn')
  }

  async assertSecondaryButtonAppears() {
    await expect(this.secondaryButton).toBeVisible()
    await expect(this.secondaryButton).toHaveText('Visit Secondary Internal')
  }

  async assertButtonIsInternal() {
    await expect(this.secondaryButton).not.toContainText('(Opens in a new window)')
  }

  async assertButtonIsExternal() {
    const buttonText = 'Visit NIHR Learn (Opens in a new window)'
    const button = this.page.getByRole('link', { name: buttonText })
    await expect(button).toBeVisible()
  }

  async assertContactBlockAppears(visible: boolean) {
    if (visible) {
      await expect(this.contactBlock).toBeVisible()
    } else {
      await expect(this.contactBlock).not.toBeVisible()
    }
  }

  async assertContactBlockTitle(title: string) {
    await expect(this.contactBlockTitle).toHaveText(title)
  }

  async assertContactBlockText(text: string) {
    await expect(this.contactBlockText).toContainText(text)
  }

  async assertContactBlockButton(buttonText: string) {
    await expect(this.contactBlockButton).toHaveText(buttonText)
  }

  async assertOnLinkedPage(linkedPage: string) {
    switch (linkedPage.toLowerCase()) {
      case 'hyperlink':
        expect(await this.page.title()).toContain('List of data service providers (')
        break
      case 'primary':
        expect(this.page.context().pages().length).toEqual(2)
        expect(await this.page.context().pages().at(1)?.title()).toEqual('Identity Gateway')
        break
      case 'secondary':
        expect(await this.page.title()).toEqual('Find, Recruit & Follow-Up Test')
        break
      case 'contact':
        expect(await this.page.title()).toEqual('Give your feedback - Find, Recruit and Follow-up')
        break
      default:
        throw new Error(`${linkedPage} is not a valid option`)
    }
  }

  async clickExternalButton() {
    const [newPage] = await Promise.all([this.page.context().waitForEvent('page'), this.primaryButton.click()])
    await newPage.waitForLoadState()
  }
}
