import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { Form } from '../reducer';

const mapStateToProps = (AppState: Form) => {
  return {
    form: {
      /*date: AppState.form.date,
      category: AppState.form.category,
      hours: AppState.form.hours,
      note: AppState.form.note*/
      date: AppState.date,
      category: AppState.category,
      hours: AppState.hours,
      note: AppState.note
    }
  }
};

export default connect(mapStateToProps)(HomePage);
