import { drag } from '../../../directive'
import { NODE_TYPES } from '../config'
import { Row, Col } from 'ant-design-vue'
export default {
  directives: { drag },

  render(h) {
    return (
      <div style="width:200px">
        <Row>
          {NODE_TYPES.map(nodeConfig =>
            h(
              Col,
              {
                style: {
                  border: '2px solid white',
                  backgroundColor:"grey",
                  textAlign:"center"
                },
                props: { span: 12 },
                directives: [{ name: 'drag', value: nodeConfig.type }]
              },
              nodeConfig.label
            )
          )}
        </Row>
      </div>
    )
  }
}
