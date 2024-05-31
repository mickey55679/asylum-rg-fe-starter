import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

// Get the API URLs from environment variables
const fiscalUrl = process.env.REACT_APP_FISCAL_URL;
const citizenURL = process.env.REACT_APP_CITIZEN_URL;

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();

  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }

  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        map_to_render = null;
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        map_to_render = null;
        break;
    }
  }

  // Function to fetch data from the API and update state
  async function updateStateWithNewData(
    years,
    view,
    office,
    stateSettingCallback
  ) {
    try {
      let fisData = {};
      let citData = {};

      console.log('Fiscal data:', fisData);
      console.log('Citizenship data:', citData);

      // Fetch fiscal data for all offices if office is not specified
      if (office === 'all' || !office) {
        const fisResponse = await axios.get(fiscalUrl, {
          params: {
            from: years[0],
            to: years[1],
          },
        });
        fisData = fisResponse.data;
        console.log('Fiscal data for all offices:', fisData);
      } else {
        // Fetch fiscal data for a specific office
        const fisResponse = await axios.get(fiscalUrl, {
          params: {
            from: years[0],
            to: years[1],
            office,
          },
        });
        fisData = fisResponse.data;
        console.log(`Fiscal data for office ${office}:`, fisData);

        // Fetch citizenship data for a specific office
        const citResponse = await axios.get(citizenURL, {
          params: {
            from: years[0],
            to: years[1],
            office,
          },
        });
        citData = citResponse.data;
        console.log(`Citizenship data for office ${office}:`, citData);
      }

      // Combine fiscal data and citizenship data into one object
      const newData = { ...fisData, citizenshipResults: citData };
      console.log('New data to be set in state:', newData);
      // Call the state setting callback with the new data
      stateSettingCallback(view, office, [newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
