import React, {PureComponent} from 'react';
import Colors from '../../common/Colors';
import RightElement from './RightElement';
import {ListItem} from 'react-native-elements';


class FirstLevelItem extends PureComponent {

    constructor(props) {
        super(props);
        this.icons = {
            'acquisition': require('../images/event_type_icons/partnership.png'),
            'merger & acquisition': require('../images/event_type_icons/partnership.png'),
            'merger & acquisitions': require('../images/event_type_icons/partnership.png'),
            'partial_acquisition': require('../images/event_type_icons/partnership.png'),
            'partnership': require('../images/event_type_icons/partnership.png'),
            'investment': require('../images/event_type_icons/investment.png'),
            'invest_money': require('../images/event_type_icons/invest_money.png'),
            'issue_share': require('../images/event_type_icons/investment.png'),
            'ipo': require('../images/event_type_icons/invest_money.png'),
            'bankruptcy': require('../images/event_type_icons/bankruptcy.png'),
            'insolvency early warning': require('../images/event_type_icons/bankruptcy.png'),
            'financial_warnings': require('../images/event_type_icons/bankruptcy.png'),
            'financial trouble_warnings': require('../images/event_type_icons/bankruptcy.png'),
            'financial_trouble': require('../images/event_type_icons/bankruptcy.png'),
            'recall_product': require('../images/event_type_icons/product.png'),
            'release_product': require('../images/event_type_icons/product.png'),
            'site_expansion': require('../images/event_type_icons/expansion.png'),
            'rnd_opening': require('../images/event_type_icons/research.png'),
            'strike': require('../images/event_type_icons/protest.png'),
            'major strikes & disputes': require('../images/event_type_icons/protest.png'),
            'protest': require('../images/event_type_icons/protest.png'),
            'protests': require('../images/event_type_icons/protest.png'),
            'supply_shortage': require('../images/event_type_icons/supply.png'),
            'layoff': require('../images/event_type_icons/layoff.png'),
            'layoffs': require('../images/event_type_icons/layoff.png'),
            'management_change': require('../images/event_type_icons/management.png'),
            'management change': require('../images/event_type_icons/management.png'),
            'high_profile_hire': require('../images/event_type_icons/hire.png'),
            'domain specific hires/ fires': require('../images/event_type_icons/hire.png'),
            'geographic hires/ fires': require('../images/event_type_icons/hire.png'),
            'site_closure': require('../images/event_type_icons/bankruptcy.png'),
            'site_close': require('../images/event_type_icons/bankruptcy.png'),
            'relocation': require('../images/event_type_icons/relocation.png'),
            'company_new_location': require('../images/event_type_icons/relocation.png'),
            'production_halt': require('../images/event_type_icons/halt.png'),
            'production halt': require('../images/event_type_icons/halt.png'),
            'production disruption': require('../images/event_type_icons/halt.png'),
            'product_exit': require('../images/event_type_icons/halt.png'),
            'fire': require('../images/event_type_icons/fire.png'),
            'industrial_fire': require('../images/event_type_icons/fire.png'),
            'industrial_incident': require('../images/event_type_icons/fire.png'),
            'industrial_accident': require('../images/event_type_icons/accident.png'),
            'industrial_explosion': require('../images/event_type_icons/explosion.png'),
            'power_outage': require('../images/event_type_icons/outage.png'),
            'it_incidents': require('../images/event_type_icons/incident.png'),
            'award_winning': require('../images/event_type_icons/award.png'),
            'endorsement': require('../images/event_type_icons/award.png'),
            'lawsuit': require('../images/event_type_icons/lawsuit.png'),
            'corruption': require('../images/event_type_icons/lawsuit.png'),
            'stock_negative': require('../images/event_type_icons/bankruptcy.png'),
            'stock price_negative': require('../images/event_type_icons/bankruptcy.png'),
            'market_exit': require('../images/event_type_icons/halt.png'),
        };
    }

    render() {
        return <ListItem
            title={this.props.title}
            leftAvatar={{ source: this.icons[this.props.eventType.toLowerCase()] }}
            containerStyle={{backgroundColor:Colors.darkBackground}}
            titleStyle={{color:Colors.whiteText}}
            bottomDivider
            onPress={this.props.onPress}
            onLongPress={this.props.onLongPress}
            rightElement={() => {
                return <RightElement
                    newsCount={this.props.count}
                    datetime={this.props.publishDate}
                    monitorDatetime={this.props.monitorDatetime}
                />
            }}
        />
    }

}

export default FirstLevelItem;
