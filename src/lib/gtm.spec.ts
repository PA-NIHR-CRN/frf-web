import { DataLayerEvent, gtmVirtualPageView } from './gtm'

// Create a mock window object with dataLayer
declare const window: { dataLayer: Record<string, unknown>[] }

// Create a mock dataLayer for testing
window.dataLayer = []

// Test suite for gtmVirtualPageView function
describe('gtmVirtualPageView', () => {
  // Test case: should push the correct event to the dataLayer
  test('should push the correct event to the dataLayer', () => {
    // Create a mock event
    const event: DataLayerEvent = {
      pageTypeName: 'example',
      url: 'https://www.example.com',
    }

    // Call the gtmVirtualPageView function
    gtmVirtualPageView(event)

    // Check if the event was pushed to the dataLayer
    expect(window.dataLayer).toContainEqual({
      event: 'VirtualPageView',
      pageTypeName: 'example',
      url: 'https://www.example.com',
    })
  })

  // Test case: should handle null pageTypeName correctly
  test('should handle null pageTypeName correctly', () => {
    // Create a mock event with null pageTypeName
    const event: DataLayerEvent = {
      pageTypeName: null,
      url: 'https://www.example.com',
    }

    // Call the gtmVirtualPageView function
    gtmVirtualPageView(event)

    // Check if the event was pushed to the dataLayer with null pageTypeName
    expect(window.dataLayer).toContainEqual({
      event: 'VirtualPageView',
      pageTypeName: null,
      url: 'https://www.example.com',
    })
  })
})
