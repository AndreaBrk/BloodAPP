import React        from 'react'
import cx           from 'classnames'
import ReportIcon   from 'material-ui/svg-icons/content/report'
import styles       from './styles.css'



export default (props) => (
  <div className={styles['no-data']}>
    <ReportIcon color="#9e9e9e" style={{ marginRight: 15, height: 32, width: 32 }} />
    <span>{props.message}</span>
  </div>
)
