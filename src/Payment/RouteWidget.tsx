import './css/style.css'
import './css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './Form'
import { PaymentInfo } from './PaymentInfo'


export default function RouteWidget() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path='/payment/:id' element={<PaymentInfo />} />
      </Routes>
    </BrowserRouter>
  )
}
