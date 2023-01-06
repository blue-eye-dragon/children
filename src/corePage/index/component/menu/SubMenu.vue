<template functional>
  <ta-sub-menu v-on="listeners" v-bind="data.attrs">
    <span slot="title">
    <!--<ta-icon type="setting"/>-->
       <!-- <span>{{data.attrs.menuInfo.icon}}</span> -->
        <ta-icon :type="data.attrs.menuInfo.icon || ''" />
      <span>{{data.attrs.menuInfo.name}}</span></span>
    <template v-for="item in data.attrs.menuInfo.children">
      <ta-menu-item v-if="!item.children" :key="item.id" :data-item="item">
        <!--<ta-icon type="setting"/>-->
         <ta-icon :type="item.icon || ''" />
        <span>{{item.name}}</span>
      </ta-menu-item>
      <sub-menu v-else :menuInfo="item" :key="item.id"  />
    </template>
</ta-sub-menu>
</template>
