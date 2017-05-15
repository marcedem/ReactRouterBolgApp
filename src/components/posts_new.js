import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    // field argument is conventional, that takes care of several events handlers that are wired up via jsx
    // "...field.input" : means that all the differents properties of this object (input.field) to be communicated as props of this input tag
    // it is a shortcut of writing things like: "onChange{field.input.onChange} onFocus{field.input.onFocus} onBlur{field.input.onBlur}" 
    renderField(field){
        // destructuring nested properties on an object
        const { meta: { touched, error } } = field;
        const className =`form-group ${touched && error ? 'has-danger' : '' }`;
        return (

            <div className={className}>
                <label> {field.label} </label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input } 
                />
                <div className="text-help">
                    <span className="error">
                        {touched ? error : ''}
                    </span>
                </div>
            </div>
        );
    }

    // helper function
    onSubmit(values){
        // this === component
        console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render(){

        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title"
                    component={ this.renderField }
                /> 
                <Field 
                    label="Categories"
                    name="categories"
                    component={ this.renderField }
                /> 
                <Field 
                    label="Post content"
                    name="content"
                    component={ this.renderField }
                /> 
                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

// by convention, validate takes an agrument named "values" which represent all the objects that the user has entered into the form
function validate(values){
    // console.log(values) -> {title: 'asdf', categories: 'asdf', content: 'asdf' }
    const errors = {};

    // Validate the inputs from 'values'
    if(!values.title || values.title.length < 3 ){
        errors.title = "Enter a title that is at least more than 2 characters!";
    }

    if(!values.categories){
        errors.categories = "Enter a category!";
    }

    if(!values.content){
        errors.content = "Enter some content please!";
    }


    // If erros is empty, the form is fine to submit
    // If erros has *any* properties, redux form assumes form is invalid
    return errors;
}

// Field component interact with redux form, and lack in rendering itself without jsx support.

// with reduxForm we skip the mapStateToProps function
// reduxForm only take on argument 
export default reduxForm({
    validate, // validate: validate
    form: 'PostsNewForm' // string assigned to 'FORM' has to be UNIQUE
}) (
    // stacking multiple like helpers
    connect(null, { createPost }) (PostsNew)
    );