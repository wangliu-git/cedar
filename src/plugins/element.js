import Vue from 'vue'
import { 
    Button,
    ButtonGroup,
    Form,
    FormItem,
    Input,
    Checkbox,
    CheckboxGroup,
    Message,
    MessageBox,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    TableColumn,
    Table,
    Pagination,
    CollapseItem,
    Collapse,
    Select,
    Option,
    DatePicker,
    Upload,
    Dialog,
    Loading ,
    Cascader,
    
    
} from 'element-ui'

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(CollapseItem)
Vue.use(Collapse)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Cascader)




Vue.prototype.$Loading = Loading
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm


