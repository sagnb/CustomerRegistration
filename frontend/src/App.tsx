import { useState, useEffect, useRef, RefObject, FormEvent } from 'react'
import { FiTrash, FiEdit, FiX, FiSave } from 'react-icons/fi'

import InputContainer from './modules/InputContainer'
import { api } from './services/api'

interface Customer {
  name: string,
  email: string,
  id: string
}

interface CustomerContainerProps {
  name: string,
  email: string,
  id: string,
  setCustomers: Function
}

interface CreateCustomerContainerProps {
  setCustomers: Function
}

function CreateCustomerContainer(props: CreateCustomerContainerProps) {
  const { setCustomers } = props

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!nameRef.current?.value || !emailRef.current?.value) {
      return
    }

    const response = await api.post('/customer', {
      name: nameRef.current.value,
      email: emailRef.current.value
    })

    nameRef.current.value = ''
    emailRef.current.value = ''

    const { name, email, id } = response.data as Customer
    setCustomers((allCustomers: Customer[]) => [...allCustomers, { name, email, id }])
  }

  return (
    <form onSubmit={handleSubmit} className='bg-slate-900 w-3/4 max-w-xl min-w-96 h-3/4 max-h-112 min-h-96 rounded-2xl flex flex-col justify-center items-center'>
      <div className='grid grid-cols-1 gap-5 content-center'>

        <div>
          <h1 className='text-slate-300 text-4xl font-medium'>Cadastro de Clientes</h1>
        </div>

        <div className='grid grid-cols-1 gap-4 content-center'>
          <InputContainer label='Nome' inputRef={nameRef} />
          <InputContainer label='E-mail' inputRef={emailRef} />
        </div>

        <div className='flex items-center justify-center'>
          <input type='submit' value='Cadastrar' className='h-10 w-40 bg-emerald-600 rounded-xl hover:bg-emerald-500 text-xl font-bold text-slate-900'>
          </input>
        </div>

      </div>
    </form>
  )
}

function getElementsWithContext(isEditing: boolean, name: string, email: string, nameRef: RefObject<HTMLInputElement>, emailRef: RefObject<HTMLInputElement>) {
  if (isEditing) {
    return (
      <div className='flex flex-col gap-4'>
        <input className='h-6 w-60 rounded' defaultValue={name} ref={nameRef}>
        </input>
        <input className='h-6 w-60 rounded' defaultValue={email} ref={emailRef}>
        </input>
      </div>
    )
  }

  return (
    <>
      <p className='text-slate-300 text-xl'>Nome: {name}<br />E-mail: {email}</p>
    </>
  )
}

function getButtonsWithContext(isEditing: boolean, editFunction: Function, deleteFunction: Function, saveFunction: Function, revertFunction: Function) {
  if (isEditing) {
    return (
      <>
        <button className='bg-red-500 h-6 w-6 rounded flex justify-center items-center hover:bg-red-400' onClick={() => revertFunction()}>
          <FiX size={18} color='white' />
        </button>

        <button className='bg-emerald-600 h-6 w-6 rounded flex justify-center items-center hover:bg-emerald-500' onClick={() => saveFunction()}>
          <FiSave size={18} color='white' />
        </button>
      </>
    )
  }
  return (
    <>
      <button className='bg-red-500 h-6 w-6 rounded flex justify-center items-center hover:bg-red-400' onClick={() => deleteFunction()}>
        <FiTrash size={18} color='white' />
      </button>

      <button className='bg-blue-500 rounded h-6 w-6 flex justify-center items-center hover:bg-blue-400' onClick={() => editFunction()}>
        <FiEdit size={18} color='white' />
      </button >
    </>
  )
}

function CustomerContainer(props: CustomerContainerProps) {
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const [isEditing, setMode] = useState(false)

  const { name, email, id, setCustomers } = props

  const deleteFunc = async () => {
    try {
      await api.delete('/deleteCustomer', {
        params: {
          id: id
        }
      })

      setCustomers((allCustomers: Customer[]) => allCustomers.filter((customer) => customer.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const editFunc = () => {
    setMode(!isEditing)
  }

  const saveFunc = async () => {
    if (!nameRef.current?.value || !emailRef.current?.value) {
      return
    }
    const response = await api.post('/updateCustomer', {
      name: nameRef.current.value,
      email: emailRef.current.value,
      id: id
    })

    const updatedCustomer = response.data as Customer

    setCustomers((allCustomers: Customer[]) => allCustomers.map(customer => customer.id !== id ? customer : updatedCustomer))
    setMode(!isEditing)
  }

  const revertFunc = () => {
    setMode(!isEditing)
  }

  return (
    <div className='bg-slate-900 w-3/4 max-w-xl min-w-96 h-32 rounded-xl mt-6 flex items-center justify-between pl-6 pr-4 hover:scale-105'>

      <div className=''>
        {getElementsWithContext(isEditing, name, email, nameRef, emailRef)}
      </div>

      <div className='flex flex-col w-6 gap-4'>
        {getButtonsWithContext(isEditing, editFunc, deleteFunc, saveFunc, revertFunc)}
      </div>

    </div>
  )
}

function App() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    loadCustomers()
  }, [])

  async function loadCustomers() {
    const response = await api.get('/customers')
    setCustomers(response.data)
  }

  return (
    <div className='bg-blue-950 flex flex-col min-h-screen w-full items-center pt-12 pb-12'>
      <CreateCustomerContainer setCustomers={setCustomers} />

      {customers.map((customer: Customer) => <CustomerContainer key={customer.id} id={customer.id} name={customer.name} email={customer.email} setCustomers={setCustomers} />)}
    </div>
  )
}

export default App
