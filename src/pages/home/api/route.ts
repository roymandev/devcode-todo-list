import { createFileRoute } from '@tanstack/react-router';
import { queryActivityList } from '../../../entities/activity';
import { Query } from '../../../shared/api';
import { HomePage } from '../ui/HomePage';

export const HomeRoute = createFileRoute('/')({
  component: HomePage,
  loader: () => Query.ensureQueryData(queryActivityList()),
});
