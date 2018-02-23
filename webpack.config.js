var FriendlyErrors = require('friendly-errors-webpack-plugin')
var path = require('path')
var projectRoot = path.resolve(__dirname, './')

module.exports = {

  entry: {
	  inventory: './src/main.js',
	  register: './src/register/register.js',
	  expired: './src/redirect/expired.js',
	  not_authorized: './src/redirect/not_authorized.js',
	  login: './src/register/login.js',
	  change_password: './src/register/password.js',
	  purchase: './src/purchase/purchase.js',
	  enroll: './src/purchase/enroll.js',
	  company: './src/company/company.js',
	  company_search: './src/company/search.js',
	  company_detail: './src/company/company_detail.js',
	  edit_brief: './src/company/detail/edit_brief.js',
	  edit_info: './src/company/detail/edit_info.js',
	  edit_product: './src/company/detail/edit_product.js',
	  edit_equipment: './src/company/detail/edit_equipment.js',
	  edit_certification: './src/company/detail/edit_certification.js',
	  position: './src/position/position.js',
	  apply: './src/position/apply.js',
	  meeting: './src/meeting/meeting.js',
	  visiting: './src/visiting/visiting.js',
	  activity_enroll: './src/util/activity_enroll.js',
	  buyer: './src/buyer/index.js',
	  buyer_edit: './src/buyer/edit.js',
	  supplier: './src/supplier/index.js',
	  supplier_edit: './src/supplier/edit.js',
	  management: './src/management/index.js',
  },
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: '[name].build.js'
  },
  node: {
    fs: 'empty'
  },
  module: {
    // 一些特定的编译规则
    // preLoaders: [
    //   {
    //     test: /\.vue$/,
    //     loader: 'eslint',
    //     include: [
    //       path.join(projectRoot, 'src')
    //     ],
    //     exclude: /node_modules/
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint',
    //     include: [
    //       path.join(projectRoot, 'src')
    //     ],
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        // 让webpack去验证文件是否是.js结尾将其转换
        test: /\.js$/,
        // 通过babel转换
        loaders: ['imports-loader?define=>false', 'babel'],
        // 不用转换的node_modules文件夹
        exclude: /node_modules/
      },
      {
    	 test: /\.vue$/,
     	 loader: 'vue'
      },
      {
        test: /\.s[a|c]ss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
	 loaders: {
    sass: 'style!css!sass',
    scss: 'style!css!sass',
		js: 'babel'
	 }
  },
  resolve: {
  	//alias: {
	//	vue: '../node_modules/vue/dist/vue.min.js'
  	//}
	  extensions: ['', '.js']
  },
  plugins: [
    new FriendlyErrors()
  ]
}
