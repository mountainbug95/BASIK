import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {markdownify, Link, toUrl, safePrefix, htmlToReact, getPages} from '../utils';

export default class Page extends React.Component {
    render() {
        let post_list = _.orderBy(_.filter(getPages(this.props.pageContext.pages, '/posts'), ['frontmatter.show_in_sidebar', true]), 'frontmatter.date', 'desc');
        let post_len = _.size(post_list);
        return (
            <Layout {...this.props}>
                <section id="main" className={'wrapper' + (_.get(this.props, 'pageContext.frontmatter.sidebar.enabled') ? ' sidebar ' + _.get(this.props, 'pageContext.frontmatter.sidebar.side') : '')}>
                    <div className="inner">
                        <header className="major">
                            <h2>{_.get(this.props, 'pageContext.frontmatter.title')}</h2>
                            {markdownify(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                        </header>
                        <div className="content">
                            {_.get(this.props, 'pageContext.frontmatter.content_img.enabled') && 
                                <Link to={safePrefix(toUrl(this.props.pageContext.pages, _.get(this.props, 'pageContext.frontmatter.content_img.url')))} className="image fit"><img src={safePrefix(_.get(this.props, 'pageContext.frontmatter.content_img.path'))} alt="" /></Link>
                            }
                            {htmlToReact(_.get(this.props, 'pageContext.html'))}
                        </div>
                        
                        
                        <section>
                            <form method="post" action="#">
                                <div className="row gtr-uniform gtr-50">
                                    <div className="col-6 col-12-xsmall">
                                        <input type="text" name="demo-name" id="demo-name" value="" placeholder="Name" />
                                    </div>
                                    <div className="col-6 col-12-xsmall">
                                        <input type="email" name="demo-email" id="demo-email" value="" placeholder="Email" />
                                    </div>
                                    <div className="col-6 col-12-small">
                                        <input type="checkbox" id="demo-copy" name="demo-copy"/>
                                        <label htmlFor="demo-copy">Email me a copy</label>
                                    </div>
                                    <div className="col-12">
                                        <textarea name="demo-message" id="demo-message" placeholder="Enter your message" rows="6" />
                                    </div>
                                    <div className="col-12">
                                        <ul className="actions">
                                            <li><input type="submit" value="Send Message" className="primary" /></li>
                                            <li><input type="reset" value="Reset" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </section>
                        
                        
                        {_.get(this.props, 'pageContext.frontmatter.sidebar.enabled') && 
                            <div className="sidebar">
                                {
                                _.map(_.orderBy(_.filter(getPages(this.props.pageContext.pages, '/posts'), ['frontmatter.show_in_sidebar', true]), 'frontmatter.date', 'desc'), (post, post_idx) => (<React.Fragment key={post_idx}>
                                    <section key={post_idx}>
                                        {_.get(post, 'frontmatter.alt_img') && 
                                            <Link to={safePrefix(_.get(post, 'url'))} className="image fit"><img src={safePrefix(_.get(post, 'frontmatter.alt_img'))} alt="" /></Link>
                                        }
                                        <h3>{_.get(post, 'frontmatter.title')}</h3>
                                        {markdownify(_.get(post, 'frontmatter.excerpt'))}
                                        <footer>
                                            <ul className="actions">
                                                <li><Link to={safePrefix(_.get(post, 'url'))} className="button">Learn More</Link></li>
                                            </ul>
                                        </footer>
                                    </section>
                                    {(!(post_idx === post_len - 1)) && 
                                        <hr key={post_idx} />
                                    }
                                </React.Fragment>))}
                            </div>
                        }
                    </div>
                </section>
            </Layout>
        );
    }
}
