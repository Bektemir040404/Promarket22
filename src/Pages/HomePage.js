import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap'
import Pro from '../products (2).json'
import numberSeparator from "number-separator";
import { useContext } from 'react';
import { MyContext } from '../App';

function HomePage() {
    const Context = useContext(MyContext)

    const BasketButton = (i) => {
        Context.setCount(prev => {
            const a = [...prev, { total: 1, id: i.id, price: i.price }]
            return a
        })
    }

    const products = Pro.filter(a => {
        if (a.title.toLowerCase().includes(Context.market.toLowerCase())) {
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
        <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', marginLeft: 40, marginTop: 60 }}>
            {products.map(g => {
                const but = Context.count.find((e) => {
                    return e.id === g.id
                })
                return (
                    <div style={{ margin: '14px' }}>
                        <Card className='card' style={{ width: '18rem', height: '100%' }}>
                            {g.discount > 0 ? <div style={{
                                position: 'absolute',
                                margin: 10,
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: 10,
                                padding: 5,
                                right: 0
                            }}><h6>-{g.discount}%</h6></div> : ''}
                            <Card.Img variant="top" src={g.image} />
                            <Card.Body>
                                <Card.Title><h6>{g.title}/{g.good}</h6></Card.Title>
                                <Card.Title style={{ color: 'green' }}>{g.discount > 0 ? `${numberSeparator(((g.price - (g.price * g.discount / 100)).toFixed()), ' ')} KGS` : ''}</Card.Title>
                                <Card.Title style={{ fontSize: 15 }}>{g.discount > 0 ? <s style={{ color: 'red' }}>{numberSeparator(g.price, " ")} KGS</s> : <Card.Title style={{ color: 'green' }}>{numberSeparator(g.price, " ")} KGS</Card.Title>}</Card.Title>
                                {but ?
                                    <div>
                                        <Button onClick={() => DeleteCard(but)} style={{ backgroundColor: 'red', color: 'white', width: 70, border: 'none' }}>-</Button>
                                        <h3 style={{ display: 'inline', margin: 15, marginBottom: 20 }}>{but.total}</h3>
                                        <Button onClick={() => AddCard(but)} style={{ backgroundColor: 'green', color: 'white', width: 70, border: 'none' }}>+</Button>
                                    </div> : <Button onClick={() => BasketButton(g)} className='button' variant="primary">В корзину</Button>
                                }
                            </Card.Body>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default HomePage;