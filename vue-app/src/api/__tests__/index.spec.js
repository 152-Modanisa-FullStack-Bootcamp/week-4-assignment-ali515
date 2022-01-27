import axios from 'axios'
import API, { GET_VIDEOS_URL } from '../index'

jest.mock('axios');

describe('Api Tests', () => {
    it('getVideos test', async () => {
        const data = []
        axios.get.mockResolvedValueOnce({ data });
        const videos = await API.getVideos.call(this);
        expect(axios.get).toHaveBeenCalledWith(GET_VIDEOS_URL)
        expect(videos).toEqual(data)
    })
}) 