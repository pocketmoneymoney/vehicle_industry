<template>
    <div class="formbox clearfix">
        <h3>编辑分类信息</h3>
        <div>
          <dl>
              <dt><b>*</b><span>类别名称：</span></dt>
              <dd>
                  <input v-model="category.categoryName" class="text" 
				   style="z-index: 10000" maxlength="20" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b></b><span>子类名称：</span></dt>
              <dd>
                  <input v-model="category.subtypeName" class="text" 
				   style="z-index: 10000" maxlength="20" type="text" />
              </dd>
          </dl>
          <dl>
              <dt><b></b><span>条目名称：</span></dt>
              <dd><input class="text" maxlength="20" style="z-index: 10000" 
				   v-model="category.itemName" type="text" />
              </dd>
          </dl>
        </div>
	    <div style="clear:both;"> </div>
		<div>
          <span><a @click="cancelAction">取消</a></span>
          <span><a @click="newAction">更新</a></span>
        </div>
    </div>
</template>

<script>
export default {
  props: ['category'],
  data: function() {
    return {
	  isNew: false,
	  oldCategory: {},
	  defaultCategory: {
		'categoryName': '',
		'categoryID': '',
		'subtypeName': '',
		'subtypeID': '',
		'itemName': '',
		'itemID': ''}
    }
  },
  methods: {
    cancelAction: function() {
      this.$emit("editCategoryDone");
	},
    newAction: function() {
	  var categoryName = trimStr(this.category.categoryName);
	  var subtypeName = trimStr(this.category.subtypeName);	
	  var itemName = trimStr(this.category.itemName);	

	  if (categoryName === '') {
        alert('请填写类别名称');
        return;
      }

	  if (specialStrCheck(categoryName) || specialStrCheck(subtypeName) ||
		  specialStrCheck(itemName)) {
        alert('请只输入数字，字母，汉字或下划线组成的字段');
        return;
	  }

	  if ((subtypeName  === '') && (itemName !== '')) {
        alert('请输入子类名称');
        return;
	  }

	  if (!this.isNew) {
		 if ((this.oldCategory.subtypeName !== '') &&
			 (this.category.subtypeName === '')) {
        	alert('请勿采用空白作为名字，如需删除，请返回上一页');
        	return;
		}
		if ((this.oldCategory.itemName !== '') &&
			 (this.category.itemName === '')) {
        	alert('请勿采用空白作为名字，如需删除，请返回上一页');
        	return;
		}
	  }

	  var params = {};
	  if (categoryName) {
		 params['categoryName'] = categoryName;
	  } 
	  if (subtypeName) {
		 params['subtypeName'] = subtypeName;
	  } 
	  if (itemName) {
		 params['itemName'] = itemName;
	  } 

	  if (this.category.categoryID) {
		 params['categoryID'] = this.category.categoryID;
	  }
	  if (this.category.subtypeID) {
		 params['subtypeID'] = this.category.subtypeID;
	  }
	  if (this.category.itemID) {
		 params['itemID'] = this.category.itemID;
	  }

	  params['isNew'] = this.isNew;

	  post('/api/admin/category', params, function (data) {
  		if (!data.success) {
		  console.log(data.msg);
		}
	  }, false);
      this.$emit("editCategoryDone");
    }
  },
  mounted: function() {
	if (this.category != {}) {
	  this.isNew = false;
	  this.oldCategory = this.category;
	} else {
	  this.isNew = true;
	  this.category = this.defaultCategory;
	}
  }
}
</script>

<style>
</style>
