import { Select } from 'antd';
import { useHistory } from 'react-router-dom';
import { STATE_CODES_ARRAY } from '../AssetActions/constant';

const { Option } = Select

export default function Selection() {
    const history = useHistory()

    function onChange(value) {
        history.push("/graph/"+value)
    }
    const style = {
        width : 200,
        margin : '0.75rem',
        marginLeft : '0px',
        borderRadius : '0.5rem',
        background : '#e0fbfc',
        padding : '0.35rem'
    } 
    return(
        <Select
            showSearch
            style={style}
            placeholder={'Search by State'}
            bordered={false}
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
        {
            STATE_CODES_ARRAY.map(e => {
                return <Option value={e.name} key={e.code}>{ e.name }</Option>
            })  
        }
        </Select>
    )
}