<template>
  <div>
    <TitlePage>Requests</TitlePage>

    <RequestsListToolbar />

    <keep-alive>
      <RequestsList />
    </keep-alive>
  </div>
</template>

<script>
import TitlePage from '../components/ui/Title/TitlePage';
import RequestsList from '../components/widgets/RequestsList';
import RequestsListToolbar from '../components/widgets/RequestsListToolbar';

export default {
  name: 'Requests',

  components: {
    TitlePage,
    RequestsListToolbar,
    RequestsList,
  },
};
</script>

<style lang="less" scoped>

</style>
