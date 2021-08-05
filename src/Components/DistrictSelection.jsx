import { Select } from 'antd';
import { useHistory } from 'react-router-dom';

const { Option } = Select

export default function DistrictSelection(props) {
    const history = useHistory()

    function onChange(value) {
        history.push("/graph/"+props.place+"/"+value)
    }
    const style = {
        width : 200,
        marginLeft : '10px',
        borderRadius : '0.5rem',
        background : '#e0fbfc',
        padding : '0.35rem'
    } 
    return(
        <Select
            showSearch
            style={style}
            placeholder={'Search by District'}
            bordered={false}
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
        {
            props.districts.map(e => {
                return <Option value={e} key={e}>{ e }</Option>
            })  
        }
        </Select>
    )
}