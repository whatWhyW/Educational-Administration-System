<template>
          <span class="demonstration">老师是否迟到</span>
        <el-radio v-model="value0" label="1">A</el-radio>
          <el-radio v-model="value0" label="2">B</el-radio>
        </template>
    
        <span class="demonstration">老师是否迟到</span>
        <el-rate
          v-model="value1"
          :colors="colors"> 
        </el-rate>
  
        <span class="demonstration">老师是否迟到</span>
        <el-rate
          v-model="value2"
          :colors="colors"> 
        </el-rate>
    
        <span class="demonstration">老师是否迟到</span>
        <el-rate
          v-model="value3"
          :colors="colors"> 
        </el-rate>
    
        <span class="demonstration">老师是否玩手机</span>
        <el-rate
          v-model="value4"
          :colors="colors"> 
        </el-rate>
  
        <span class="demonstration">上课问题老师能不能帮解决</span>
        <el-rate
          v-model="value5"
          :colors="colors"> 
        </el-rate>
    
        <span class="demonstration">老师专业素质</span>
        <el-rate
          v-model="value6"
          :colors="colors"> 
        </el-rate>
  
        <span class="demonstration">老师讲课态度</span>
        <el-rate
          v-model="value7"
          :colors="colors"> 
        </el-rate>
    
        <span class="demonstration">老师备课是否充分</span>
        <el-rate
          v-model="value8"
          :colors="colors"> 
        </el-rate>
    
        <span class="demonstration">课程难以程度</span>
        <el-rate
          v-model="value9"
          :colors="colors"> 
        </el-rate>
    
        <span class="demonstration">老师是否迟到</span>
        <el-rate
          v-model="value10"
          :colors="colors"> 
        </el-rate>
  
        <span class="demonstration">学习吸收率</span>
        <el-rate
          v-model="value11"
          :colors="colors"> 
        </el-rate>
    
        <span class="demonstration">课堂趣味性</span>
        <el-rate
          v-model="value12"
          :colors="colors"> 
        </el-rate>
    
        <span class="demonstration">继续学习兴趣</span>
        <el-rate
          v-model="value13"
          :colors="colors"> 
        </el-rate>
    
        <span class="demonstration">继续学习兴趣</span>
        <el-rate
          v-model="value13"
          :colors="colors"> 
        </el-rate>
  
    <el-form-item label="教师评价">
          <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="value13">
      </el-input>
        </el-form-item>
        <el-form-item label="教学建议">
         <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="value14">
    </el-input>
        </el-form-item>