/* channel id 저장 */
import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useChannelIdStore = defineStore('channelId', () => {
  const channelId = ref('');
  const changeChannelId = (selectedId: string) => (channelId.value = selectedId);

  return {
    channelId,
    changeChannelId
  };
});
