import { getVideoID } from './getVideoID'

describe('getVideoID', () => {
  it('extracts the video ID from a YouTube URL', () => {
    expect(getVideoID('msizPweg3kE')).toEqual('msizPweg3kE')
    expect(getVideoID('https://www.youtube.com/watch?v=msizPweg3kE')).toEqual('msizPweg3kE')
    expect(getVideoID('https://www.youtube.com/embed/msizPweg3kE')).toEqual('msizPweg3kE')
  })
})
