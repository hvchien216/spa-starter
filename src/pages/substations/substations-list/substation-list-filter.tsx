import { SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '~/components/ui';
import { RHFInput } from '~/components/form';

import useSubstationsListParamsControl from './use-substations-list-params-control';

const FormSchema = z.object({
  keyword: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;
const SubstationListFilter = () => {
  const { q, handleChangeKeyword } = useSubstationsListParamsControl();

  const form = useForm<FormValues>({
    defaultValues: {
      keyword: q,
    },
  });

  return (
    <div className='container-wrapper'>
      <Form {...form}>
        <form>
          <RHFInput name='keyword' icon={<SearchIcon />} placeholder='Type to search' onChange={handleChangeKeyword} />
        </form>
      </Form>
    </div>
  );
};

export default SubstationListFilter;
