
export async function waitForCategoryRequest(page) {
  return page.waitForResponse(response => {
    const isByCat = response.url().includes('/bycat');
    const isPost = response.request().method() === 'POST';
    const isOk = response.status() === 200;

    return isByCat && isPost && isOk;
  });
}

export async function waitForPaginationRequest(page) {
  return page.waitForResponse(response => {
    const isPagination = response.url().includes('/pagination');
    const isPost = response.request().method() === 'POST';
    const isOk = response.status() === 200;

    return isPagination && isPost && isOk;
  });
}


