import React, {Component} from 'react';
import { Card, CardTitle, CardText, CardBody, CardImg, Breadcrumb, BreadcrumbItem, Label, Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isCommentFormModalOpen: false,
      };
  
      this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
      this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);
    }
  
    handleCommentFormSubmit(values) {
      alert("Current State is: " + JSON.stringify(values));
    }
  
    toggleCommentFormModal() {
      this.setState({
        isCommentFormModalOpen: !this.state.isCommentFormModalOpen,
      });
    }

    render() {
        return (
          <React.Fragment>
            <Button outline onClick={this.toggleCommentFormModal}>
              <span className="fa fa-comments fa-lg"></span> Submit Comment
            </Button>
    
            <Modal
              isOpen={this.state.isCommentFormModalOpen}
              toggle={this.toggleCommentFormModal}
            >
              <ModalHeader toggle={this.toggleCommentFormModal}>
                {" "}
                Submit Comment{" "}
              </ModalHeader>
              <ModalBody>
                <LocalForm
                  onSubmit={(values) => this.handleCommentFormSubmit(values)}
                >
                  <Row className="form-group">
                    <Label htmlFor="rating" md={12}>
                      Rating
                    </Label>
                    <Col md={12}>
                      <Control.select
                        model=".rating"
                        className="form-control"
                        name="rating"
                        id="rating"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Control.select>
                    </Col>
                  </Row>
    
                  <Row className="form-group">
                    <Label htmlFor="author" md={12}>
                      {" "}
                      Your Name{" "}
                    </Label>
                    <Col md={12}>
                      <Control.text
                        model=".author"
                        id="author"
                        name="author"
                        placeholder="Your Name"
                        className="form-control"
                        validators={{
                          required,
                          minLength: minLength(3),
                          maxLength: maxLength(15),
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        messages={{
                          minLength: "Must be greater than 2 characters",
                          maxLength: "Must be 15 characters or less",
                        }}
                      />
                    </Col>
                  </Row>
    
                  <Row className="form-group">
                    <Label htmlFor="comment" md={12}>
                      Comment
                    </Label>
                    <Col md={12}>
                      <Control.textarea
                        model=".comment"
                        id="comment"
                        name="comment"
                        rows="6"
                        className="form-control"
                      />
                    </Col>
                  </Row>
    
                  <br></br>
                  <Row className="form-group">
                    <Col>
                      <Button type="submit" color="primary">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </LocalForm>
              </ModalBody>
            </Modal>
          </React.Fragment>
        );
      }
    }

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
