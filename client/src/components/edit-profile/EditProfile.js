import React, { Component } from 'react'
import classnames from 'classnames';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import InputGroup from '../common/InputGroup';
import {createProfile,getCurrentProfile} from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty';
 class CreateProfile extends Component {
  
  constructor(props){
    super(props);
    this.state={
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }
this.onChange=this.onChange.bind(this);
this.profileSubmit=this.profileSubmits.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company = (profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
  }



  onChange(e){
this.setState({[e.target.name]:e.target.value})
  }

  profileSubmits(e){
  e.preventDefault()
    const profileData = {
        handle:this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubusername: this.state.githubusername,
        bio: this.state.bio,
        twitter: this.state.twitter,
        facebook: this.state.facebook,
        linkedin: this.state.linkedin,
        youtube: this.state.youtube,
        instagram: this.state.instagram
 
}
this.props.createProfile(profileData, this.props.history);
  }
  
  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    const options = [
      { label: '* Select Professional Status', value: 'status' },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    const ProfileList = () => (
      <select
                 placeholder="status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Could be your own company or one you work for"
         className={classnames('form-control form-control-lg', {
        'is-invalid': errors.status
      })}
      
      > 
      {errors.status && (
                        <div className="invalid-feedback">{errors.status}</div>
                      )}


          {options.map(profile => <option key={profile.label} value={profile.label}>{profile.value}</option>)}
      </select>
    );
    
   
    return (
      <div>
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
             
          <form  onSubmit={this.profileSubmit}>
          <div className="form-group">
                  <input
                    name="handle"
                    value={this.state.handle}
                    type="text"
                    placeholder="* Profile Handle"
                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.handle
                    })}
                  
                    onChange={this.onChange}
                  />
                  {errors.handle && (
                    <div className="invalid-feedback">{errors.handle}</div>
                  )}
                </div>

                <div className="form-group">
                  <ProfileList/> 
                </div>

                <div className="form-group">
                  <input
                   placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.company
                  })}
                  />
                  {errors.Company && (
                    <div className="invalid-feedback">{errors.Company}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                    info="Could be your own website or a company one"
                   className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.website
                  })}
                  />
                  {errors.website && (
                    <div className="invalid-feedback">{errors.website}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                   placeholder="Location"
                   name="location"
                   value={this.state.location}
                   onChange={this.onChange}
                   error={errors.location}
                   info="City or city & state suggested (eg. Boston, MA)"
                   className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.location
                  })}
                  />
                  {errors.Location && (
                    <div className="invalid-feedback">{errors.Location}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                   placeholder="* Skills"
                   name="skills"
                   value={this.state.skills}
                   onChange={this.onChange}
                   error={errors.skills}
                   info="Please use comma separated values (eg.
                     HTML,CSS,JavaScript,PHP"
                   className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.skills
                  })}
                  />
                  {errors.skills && (
                    <div className="invalid-feedback">{errors.skills}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.onChange}
                    error={errors.githubusername}
                    info="If you want your latest repos and a Github link, include your username"
  
                   className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.githubusername
                  })}
                  />
                  {errors.githubusername && (
                    <div className="invalid-feedback">{errors.githubusername}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                     placeholder="Short Bio"
                     name="bio"
                     value={this.state.bio}
                     onChange={this.onChange}
                     error={errors.bio}
                     info="Tell us a little about yourself"
  
                   className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.bio
                  })}
                  />
                  {errors.bio && (
                    <div className="invalid-feedback">{errors.bio}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-primary"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
              
                {socialInputs}
                <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>({
  errors:state.errors,
  profile:state.profile
});
export default connect(mapStateToProps,{createProfile, getCurrentProfile})(withRouter(CreateProfile))
