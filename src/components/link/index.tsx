import { Link as FabricLink } from 'office-ui-fabric-react';
import * as React from 'react';
import { NavLink as NavRouterLink } from 'react-router-dom';

import './index.css';

export interface LinkProps {
    href?: string;
    to?: string;
    useNavButton?: boolean;
    className?: string;
}

export class Link extends React.Component<LinkProps>{
    public render() {
        const props = this.props.to
            ? { as: NavRouterLink, exact: true, ...this.props }
            : this.props;

        return (
            <FabricLink {...props} className={`routable-link ${this.props.className || ''}`}>
                {this.props.children}
            </FabricLink>
        );
    }
}