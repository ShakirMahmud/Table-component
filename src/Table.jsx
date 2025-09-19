import { useState, useEffect } from 'react'

function Table() {
  const [data, setData] = useState([]);
  const [showAddButton, setShowAddButton] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error loading data:', error))
  }, [])
  const btnClicked = () => {
    setShowAddButton(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    setData([...data, { id: data.length + 1, name, description }])
    setShowAddButton(true)
  }
  const closedButtonClicked = () => {
    setShowAddButton(true);
  }
  const filteredData = data.filter(d => d.name.toLowerCase().includes(searchInput.toLowerCase().trim()) || d.description.toLowerCase().includes(searchInput.toLowerCase().trim()))

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pages = [...Array(totalPages).keys()]

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        {
          showAddButton ? <button
            onClick={btnClicked}
            style={{
              padding: '8px 16px',
              border: '1px solid black'
            }}>
            Add New
          </button> :
            <form onSubmit={handleSubmit}>
              <input
                style={{
                  padding: '8px',
                  border: '1px solid black',
                  borderRadius: "8px"
                }}
                type="text"
                name='name'

              />
              <br />
              <input
                style={{
                  padding: '8px',
                  border: '1px solid black',
                  marginTop: "8px",
                  borderRadius: "8px"
                }}
                type="text"
                name='description'

              />
              <br />
              <button
                onClick={closedButtonClicked}
                style={{
                  padding: '8px 16px',
                  border: '1px solid black',
                  marginTop: "8px"
                }}>
                Close
              </button>
              <button
                type='submit' //
                style={{
                  padding: '8px 16px',
                  border: '1px solid black',
                  marginLeft: "16px"
                }}>
                Add
              </button>

            </form>
        }

        <input
          type="text"
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Search..."
          style={{
            padding: '8px',
            border: '1px solid black'
          }}
        />
      </div>
      <table style={{
        borderCollapse: 'collapse',
        width: '100%'
      }}>
        <thead>
          <tr>
            <th style={{
              border: '1px solid black',
              padding: '8px',
              textAlign: 'left',
              fontWeight: 'bold'
            }}>ID</th>
            <th style={{
              border: '1px solid black',
              padding: '8px',
              textAlign: 'left',
              fontWeight: 'bold'
            }}>Name</th>
            <th style={{
              border: '1px solid black',
              padding: '8px',
              textAlign: 'left',
              fontWeight: 'bold'
            }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map(item => (
              <tr key={item.id}>
                <td style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'left'
                }}>{item.id}</td>
                <td style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'left'
                }}>{item.name}</td>
                <td style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'left'
                }}>{item.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              padding: '4px',
              border: '1px solid black'
            }}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '4px 8px',
              border: '1px solid black'
            }}>
            Previous
          </button>
          {pages.map((page, i) => (
            <button key={i}
              onClick={() => handlePageChange(page + 1)}
          style={{
            padding: '4px 8px',
            border: '1px solid black',
            backgroundColor: currentPage === page + 1 ? 'black' : 'white',
            color: currentPage === page + 1 ? 'white' : 'black',
          }}
            >
          {page + 1}
        </button>
          ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          style={{
            padding: '4px 8px',
            border: '1px solid black'
          }}>
          Next
        </button>
      </div>
    </div >
    </>
  )
}

export default Table