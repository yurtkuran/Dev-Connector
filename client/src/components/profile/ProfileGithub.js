import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// bring in redux
import { connect } from 'react-redux';

// bring in actions
import Spinner from '../layout/Spinner';
import { getGitHubRepos } from '../../actions/profileActions';

const ProfileGithub = ({ getGitHubRepos, username, repos }) => {
    // load profile when component loads
    useEffect(() => {
        getGitHubRepos(username);
    }, [getGitHubRepos, username]);

    return (
        <div class='profile-github'>
            <h2 class='text-primary my-1'>
                <i class='fab fa-github'></i> Github Repos
            </h2>

            {repos.length > 0 ? (
                repos.map((repo, index) => (
                    <div className='repo bg-white my-1 p-1' key={index}>
                        <div>
                            <h4>
                                <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                                    {repo.name}
                                </a>
                                <p>{repo.description}</p>
                            </h4>
                        </div>
                        <div>
                            <ul>
                                <li class='badge badge-primary'>Stars: {repo.stargazers_count}</li>
                                <li class='badge badge-dark'>Watchers: {repo.watchers_count}</li>
                                <li class='badge badge-light'>Forks: {repo.forks_count}</li>
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <h4>No repos to display.</h4>
            )}
        </div>
    );
};

ProfileGithub.propTypes = {
    getGitHubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
};

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
};

const mapStatetoProps = (state) => ({
    repos: state.profile.repos,
});

export default connect(mapStatetoProps, { getGitHubRepos })(ProfileGithub);
