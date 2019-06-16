import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { QueryRenderer, graphql } from 'react-relay';
import { Environment, RecordSource, Store } from 'relay-runtime';
import { RelayNetworkLayer } from 'react-relay-network-modern/lib';
import { useQuery } from "relay-hooks";

const network = new RelayNetworkLayer([
  next => async req => {
    console.log('RelayRequest: ', req);
    return await next(req);
  }
]);

const source = new RecordSource();
const store = new Store(source);
const environment = new Environment({ network, store });

const variables = {
  id: 'someid',
};

const query = graphql`
  query serverQuery($pageID: ID!) {
    node(id: $pageID) {
      id
    }
  }
`;

const Example = () => {
  console.log('########## without hooks NetworkLayer invocation');
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={variables}
      render={()=>{}}
    />
  );
};

const HooksExample = () => {
  console.log('########## with hooks NetworkLayer invocation');
  const result = useQuery({
    environment,
    query,
    variables,
  });

  console.log('########## with hooks result');
  console.log(result);
  return null;
};

ReactDOMServer.renderToString(<Example />);
ReactDOMServer.renderToString(<HooksExample />);
