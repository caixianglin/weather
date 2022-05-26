import useService from '@/services';

export default {
  state: {
    location: {
      latitude: 0,
      longitude: 0,
    },
    addressComponent: {
      city: '杭州市',
      province: '浙江省'
    }
  },

  reducers: {
    update(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    }
  },

  effects: (dispatch) => ({
    async getLocationInfo() {
      const data = await useService.getLocation();
      dispatch.location.update({
        location: data,
      });
      return data;
    },
    async getLocationAddress(params) {
      const data = await useService.getLocationRegeo(params);
      dispatch.location.update({
        addressComponent: data
      });
      return data;
    }
  })
};
