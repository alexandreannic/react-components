import * as React from 'react'
import {Page} from '../../../lib/Page/index'
import {Demo} from '../../shared/Demo'
import {ToastDemoExample} from './ToastDemoExample'
import preval from 'babel-plugin-preval/macro'
import {Code} from '../../shared/Code/Code'

const ToastDemo = () => {
  return (
    <Page>
      <h1>Toast</h1>
      <p>
        Simple wrapper for <Code>{`<Snackbar/>`}</Code> handling the commun types: error, success, warning, info and
        loading.
      </p>

      <h2>Usage</h2>
      <p>
        Add <Code>{`<ToastProvider/>`}</Code> in the root of your application, then simply wrap your component
        with <Code>withToast</Code> to access the methods:
        <ul>
          <li><Code>toastError</Code></li>
          <li><Code>toastWarning</Code></li>
          <li><Code>toastSuccess</Code></li>
          <li><Code>toastInfo</Code></li>
          <li><Code>toastLoading</Code></li>
        </ul>
      </p>
      <Demo
        raw={preval`module.exports = require('fs').readFileSync(require.resolve('./ToastDemoExample.tsx'), 'utf8')`}
        component={ToastDemoExample}/>
    </Page>
  )
}

export default ToastDemo
