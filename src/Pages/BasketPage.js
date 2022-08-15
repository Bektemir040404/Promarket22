import { useContext } from 'react';
import { MyContext } from '../App';
import Products from '../products (2).json'
import numberSeparator from "number-separator";
import { Button } from 'react-bootstrap'

function BasketPage() {
  const Context = useContext(MyContext)

  const pro = Products.filter(el => {
    if (Context.count.find((e) => {
      return e.id === el.id
    })) {
      return true
    } else {
      return false
    }
  })

  const AddCard = (i) => {
    Context.setCount(a => {
      return a.map(all => {
        if (all.id === i.id) {
          all.total++
        }
        return all
      })
    })
  }

  const DeleteCard = (i) => {
    Context.setCount(a => {
      if (i.total === 1) {
        return (a.filter(el => el.id !== i.id))
      } else {
        return a.map(all => {
          if (all.id === i.id) {
            all.total--   
          }
          return all
        })
      }
    })
  }
  
  return (
    <>
      {Context.count.length > 0 ? <>
        <h2 style={{ marginTop: 60, marginLeft: '10%', display: 'inline-block' }}>Корзина</h2>
        <Button style={{ margin: 10, position: 'absolute', top: 52, right: '10%' }}>Оформить заказ ()</Button>
        <div style={{ marginLeft: '10%' }}>
          {pro.map(el => {
            const but = Context.count.find((e) => {
              return e.id === el.id
            })
            return (
              <div style={{ border: 'solid 1px grey ', width: '88%', padding: 20, marginBottom: 20, display: 'flex', borderRadius: 5 }}>
                <div>
                  <img style={{ width: 150, borderRadius: 5 }} src={el.image} />
                </div>
                <div style={{ marginTop: 20, marginLeft: 100 }}>
                  <h5 style={{ color: 'green', display: 'inline-block' }}>{el.discount > 0 ? `${numberSeparator(((el.price - (el.price * el.discount / 100)).toFixed()), ' ')} KGS` : ''}</h5>
                  <h5 style={{ display: 'inline-block', marginLeft: 20 }}>{el.discount > 0 ? <s style={{ color: 'red' }}>{numberSeparator(el.price, " ")} KGS</s> : <h5 style={{ color: 'green' }}>{numberSeparator(el.price, " ")} KGS</h5>}</h5>
                  <h4>{el.title} / {el.good}</h4>
                  <h5>Сумма: {numberSeparator(((el.price - (el.price * el.discount / 100)) * but.total).toFixed(), ' ')} сом</h5>
                  <div>
                    <Button onClick={() => DeleteCard(but)} style={{ backgroundColor: 'red', color: 'white', width: 70, border: 'none' }}>-</Button>
                    <h3 style={{ display: 'inline', margin: 15, marginBottom: 20 }}>{but.total}</h3>
                    <Button onClick={() => AddCard(but)} style={{ backgroundColor: 'green', color: 'white', width: 70, border: 'none' }}>+</Button>
                  </div>
                </div>
                {el.discount > 0 ? <div style={{
                  position: 'absolute',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: 10,
                  padding: 5,
                  right: 165
                }}><h6>-{el.discount}%</h6></div> : ''}
              </div>
            )
          })}
        </div> </> : 
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
          <img src='https://png.clipart.me/istock/previews/7402/74028993-empty-yellow-shopping-cart.jpg'/>
        </div> }
    </>
  )
}

export default BasketPage