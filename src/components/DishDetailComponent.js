import React from 'react';
import { Card, CardTitle, CardText, CardBody, CardImg, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDish({dish}){
        if(dish != null){
            return (
                <Card>
                    <CardImg width="100%" top src={dish.image} alt={dish.name} ></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return (<div></div>)
        }
    }

    function RenderComments({comments}) {
        if(comments!=null){
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            return(
                <div key={comments.id}>
                    <h4>Comments</h4>
                    {comments.map((comment)=>{
                        return(
                            <ul key={comment.id} className="list-unstyled">
                                <li>{comment.comment}</li>
                                <br/>
                                <li>-- {comment.author},{months[comment.date.split('-')[1]-1]} {comment.date.split('-')[2].split('T')[0]}, {comment.date.split('-')[0]}</li>
                            </ul>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    const DishDetail = (props) => { 
        if(props.selectedDish != null){
            return (
                <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                    <div className = 'row'>
                        <div className = 'col-12 col-md-5 m-1'>
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className = 'col-12 col-md-5 m-1'>
                            <RenderComments comments = {this.props.comments} />
                        </div>
                    </div> 
                </div>
            )
            } else {
                return (<div></div>)
        }
        
    }

    export default DishDetail;
