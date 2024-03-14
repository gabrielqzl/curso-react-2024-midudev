import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { SortBy, type User } from './types.d'

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShotColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShotColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)

  }

  const handleReser = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)

  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const filteredUsers = useMemo(() => {
    console.log('calculate filteredUsers')
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
        return user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
      }) : users
  }, [users, filterCountry])


  const sortedUsers = useMemo(() => {
    console.log('calculate sortedUsers')

    if (sorting === SortBy.NONE) return filteredUsers

    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    }
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    }
    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
    }
    return filteredUsers

  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors} type='button'>
          Colorear filas
        </button>

        <button onClick={toggleSortByCountry} type='button'>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>

        <button onClick={handleReser} type='button'>
          Resetear estado
        </button>

        <input placeholder='Filtra por país' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} />

      </header>
      <main>
        <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App
