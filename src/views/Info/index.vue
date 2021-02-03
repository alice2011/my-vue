<template>
    <div>
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for="">类型：</label>
                    <div class="wrap-content">
                        <el-select v-model="value" placeholder="请选择" style="width:100px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="label-wrap date">
                    <label for="">日期：</label>
                    <div class="wrap-content">
                        <el-date-picker
                            v-model="value2"
                            type="datetimerange"
                            align="right"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="label-wrap key-word">
                    <label for="">关键字：</label>
                    <div class="wrap-content">
                        <el-select v-model="search_key" style="width:80px;">
                            <el-option
                                v-for="item in searchOption"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <el-input v-model="search_keyWord" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger">搜索</el-button>
            </el-col>
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="2">
                <el-button type="danger" class="pull-right">新增</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    </div>
</template>
<script>
import { reactive,ref } from '@vue/composition-api'
export default {
    name:'infoIndex',
    setup(props){
        const options=reactive([{
          value: 1,
          label: '国际信息'
        }, {
          value: 2,
          label: '国内信息'
        }, {
          value: 3,
          label: '行业信息'
        }])
        //搜索关键字
        const searchOption = reactive([
            {
                value:'id',
                label:'ID'
            },{
                value:'title',
                label:'标题'
            }
        ])
        const search_key = ref('id')
        const value=ref('')
        const value2=ref('')

        return {
            options,
            searchOption,
            search_key,
            value,
            value2
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap{
    &.category { @include labelDom(left,60,40); }
    &.date { @include labelDom(right,95,40); }
    &.key-word{ @include labelDom(right,100,40); }
}
</style>