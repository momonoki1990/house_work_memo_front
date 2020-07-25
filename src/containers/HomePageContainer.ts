import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { AppState } from '../Store';

const mapStateToProps = (AppState: AppState) => {
  return {
    date: AppState.form.date,
    category: AppState.form.category,
    hours: AppState.form.hours,
    note: AppState.form.note,
    aaa: AppState.daily.month
  };
}

export default connect(mapStateToProps)(HomePage);
